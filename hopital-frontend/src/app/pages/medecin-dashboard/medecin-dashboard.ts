import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PatientService } from '../../services/patient.service';
import { RendezVousService } from '../../services/rendez-vous';
import { Patient } from '../../models/patient.model';
import { Observable, catchError, of, map, startWith, BehaviorSubject, switchMap } from 'rxjs'; 
import Swal from 'sweetalert2';

// 1. Interface pour les Patients
interface PatientListState {
  patients: Patient[];
  loading: boolean;
  error: string | null;
}

interface RdvState {
  rdvs: any[];
  loading: boolean;
  error: string | null;
}

@Component({
  selector: 'app-medecin-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './medecin-dashboard.html',
  styleUrls: ['./medecin-dashboard.css']
})
export class MedecinDashboard implements OnInit {

  private refreshRdvSignal$ = new BehaviorSubject<void>(undefined);
  private refreshSignal$ = new BehaviorSubject<void>(undefined);

  // 2. Gestion des Rendez-vous
  rdvState$: Observable<RdvState> = this.refreshRdvSignal$.pipe(
    switchMap(() => {
      const medecinId = 1; // Dr. Yassine
      return this.rdvService.getRdvByMedecin(medecinId).pipe(
        map(data => ({ rdvs: data || [], loading: false, error: null })),
        startWith({ rdvs: [], loading: true, error: null }),
        catchError(err => of({ rdvs: [], loading: false, error: 'Erreur lors du chargement des RDV' }))
      );
    })
  );

  // 3. Gestion des Patients
  patientsState$: Observable<PatientListState> = this.refreshSignal$.pipe(
    switchMap(() => this.patientService.getPatients().pipe(
      map(data => ({ patients: data || [], loading: false, error: null })),
      startWith({ patients: [], loading: true, error: null }),
      catchError(err => of({ patients: [], loading: false, error: 'Erreur lors du chargement des patients' }))
    ))
  );

  constructor(
    private patientService: PatientService,
    private rdvService: RendezVousService
  ) {}

  ngOnInit(): void {
    // Initial load
    this.refreshRdvSignal$.next();
    this.refreshSignal$.next();
  }

  // Helper method for status display
  getStatusDisplay(status: string): string {
    switch(status) {
      case 'EN_ATTENTE': return 'EN ATTENTE';
      case 'CONFIRME': return 'CONFIRMÉ';
      case 'ANNULE': return 'ANNULÉ';
      case 'REFUSE': return 'REFUSÉ';
      default: return status;
    }
  }

  // Helper method to get patient initials
  getPatientInitials(patient: any): string {
    if (!patient) return 'P';
    
    const nomInitial = patient.nom ? patient.nom.charAt(0).toUpperCase() : '';
    const prenomInitial = patient.prenom ? patient.prenom.charAt(0).toUpperCase() : '';
    
    if (nomInitial || prenomInitial) {
      return nomInitial + prenomInitial;
    }
    return 'P';
  }

  // Helper method to get patient full name
  getPatientFullName(patient: any): string {
    if (!patient) return 'Patient non spécifié';
    
    const nom = patient.nom || '';
    const prenom = patient.prenom || '';
    
    if (nom || prenom) {
      return `${nom} ${prenom}`.trim();
    }
    return 'Patient non spécifié';
  }

  // Helper method to get waiting count
  getWaitingCount(rdvs: any[]): number {
    if (!rdvs || !Array.isArray(rdvs)) return 0;
    return rdvs.filter(r => r && r.statut === 'EN_ATTENTE').length;
  }

  // Helper method to get confirmed count
  getConfirmedCount(rdvs: any[]): number {
    if (!rdvs || !Array.isArray(rdvs)) return 0;
    return rdvs.filter(r => r && r.statut === 'CONFIRME').length;
  }

  // accept appointment
  accepterRDV(id: number): void {
    Swal.fire({
      title: 'Confirmer la demande',
      text: 'Voulez-vous accepter ce rendez-vous ?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#7ED321',
      cancelButtonColor: '#FF6B6B',
      confirmButtonText: 'Oui, accepter',
      cancelButtonText: 'Annuler'
    }).then((result) => {
      if (result.isConfirmed) {
        this.rdvService.updateStatut(id, 'CONFIRME').subscribe({
          next: () => {
            Swal.fire({
              title: 'Succès !',
              text: 'Le rendez-vous a été accepté.',
              icon: 'success',
              confirmButtonColor: '#7ED321'
            });
            this.refreshRdvSignal$.next();
          },
          error: (err) => {
            console.error('Erreur:', err);
            Swal.fire({
              title: 'Erreur',
              text: 'Impossible d\'accepter le rendez-vous.',
              icon: 'error'
            });
          }
        });
      }
    });
  }

  async ouvrirFormulaireConsultation(rdv: any) {
  const { value: formValues } = await Swal.fire({
    title: `Rapport Médical - ${this.getPatientFullName(rdv.patient)}`,
    html:
      '<label style="text-align:left; display:block; font-weight:bold;">Diagnostic :</label>' +
      '<textarea id="swal-diag" class="swal2-textarea" placeholder="Entrez le diagnostic..."></textarea>' +
      '<label style="text-align:left; display:block; font-weight:bold;">Ordonnance :</label>' +
      '<textarea id="swal-ord" class="swal2-textarea" placeholder="Liste des médicaments..."></textarea>',
    focusConfirm: false,
    showCancelButton: true,
    confirmButtonText: 'Finaliser la consultation',
    confirmButtonColor: '#9b59b6',
    preConfirm: () => {
      const diag = (document.getElementById('swal-diag') as HTMLTextAreaElement).value;
      const ord = (document.getElementById('swal-ord') as HTMLTextAreaElement).value;
      if (!diag || !ord) {
        Swal.showValidationMessage('Veuillez remplir les deux champs');
      }
      return { diagnostic: diag, ordonnance: ord };
    }
  });

  if (formValues) {
    // On appelle une nouvelle méthode dans le service (à ajouter)
    this.rdvService.terminerConsultation(rdv.id, formValues).subscribe({
      next: () => {
        Swal.fire('Succès', 'Le rapport a été enregistré et le RDV est terminé.', 'success');
        this.refreshRdvSignal$.next();
      },
      error: () => Swal.fire('Erreur', 'Impossible de sauvegarder le rapport.', 'error')
    });
  }
}


  // refuse appointment
  refuserRDV(id: number): void {
    Swal.fire({
      title: 'Refuser la demande',
      text: 'Voulez-vous refuser ce rendez-vous ?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#FF6B6B',
      cancelButtonColor: '#95a5a6',
      confirmButtonText: 'Oui, refuser',
      cancelButtonText: 'Annuler'
    }).then((result) => {
      if (result.isConfirmed) {
        this.rdvService.updateStatut(id, 'ANNULE').subscribe({
          next: () => {
            Swal.fire({
              title: 'Refusé',
              text: 'Le rendez-vous a été refusé.',
              icon: 'info',
              confirmButtonColor: '#FF6B6B'
            });
            this.refreshRdvSignal$.next();
          },
          error: (err) => {
            console.error('Erreur:', err);
            Swal.fire({
              title: 'Erreur',
              text: 'Impossible de refuser le rendez-vous.',
              icon: 'error'
            });
          }
        });
      }
    });
  }

  // View patient details
  viewPatientDetails(patient: any): void {
    Swal.fire({
      title: `Détails du patient`,
      html: `
        <div style="text-align: left; line-height: 1.6;">
          <p><strong>Nom complet:</strong> ${patient.nom || ''} ${patient.prenom || ''}</p>
          <p><strong>ID:</strong> ${patient.id || 'Non disponible'}</p>
          <!-- Add other properties that exist in your Patient model -->
          ${patient.dateNaissance ? `<p><strong>Date de naissance:</strong> ${patient.dateNaissance}</p>` : ''}
          ${patient.adresse ? `<p><strong>Adresse:</strong> ${patient.adresse}</p>` : ''}
          ${patient.genre ? `<p><strong>Genre:</strong> ${patient.genre}</p>` : ''}
        </div>
      `,
      icon: 'info',
      confirmButtonColor: '#4A90E2',
      width: '500px'
    });
  }

  // Delete patient
  deletePatient(id: number): void {
    Swal.fire({
      title: 'Supprimer le patient',
      text: 'Cette action est irréversible. Voulez-vous continuer ?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#FF6B6B',
      cancelButtonColor: '#95a5a6',
      confirmButtonText: 'Oui, supprimer',
      cancelButtonText: 'Annuler'
    }).then((result) => {
      if (result.isConfirmed) {
        this.patientService.deletePatient(id).subscribe({
          next: () => {
            Swal.fire({
              title: 'Supprimé !',
              text: 'Le patient a été supprimé.',
              icon: 'success',
              confirmButtonColor: '#FF6B6B'
            });
            this.refreshSignal$.next();
          },
          error: (err) => {
            console.error('Erreur:', err);
            Swal.fire({
              title: 'Erreur',
              text: 'Impossible de supprimer le patient.',
              icon: 'error'
            });
          }
        });
      }
    });
  }

  // Refresh patients list
  refreshPatients(): void {
    this.refreshSignal$.next();
    Swal.fire({
      title: 'Actualisation',
      text: 'Liste des patients actualisée.',
      icon: 'success',
      timer: 1500,
      showConfirmButton: false
    });
  }

  // View all appointments
  viewAllAppointments(): void {
    Swal.fire({
      title: 'Tous les rendez-vous',
      text: 'Cette fonctionnalité affichera tous les rendez-vous passés et futurs.',
      icon: 'info',
      confirmButtonColor: '#4A90E2'
    });
  }
}