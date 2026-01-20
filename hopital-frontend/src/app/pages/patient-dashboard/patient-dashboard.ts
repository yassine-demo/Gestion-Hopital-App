import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MedecinService } from '../../services/medecin'; 
import { AuthService } from '../../services/auth.service';
import { RendezVousService } from '../../services/rendez-vous'; 
import { Observable, BehaviorSubject, of } from 'rxjs';
import { map, startWith, catchError, switchMap } from 'rxjs/operators';
import Swal from 'sweetalert2';
import { tap } from 'rxjs/operators';

interface RdvState {
  rdvs: any[];
  loading: boolean;
  error: string | null;
}

@Component({
  selector: 'app-patient-dashboard',
  standalone: true,
  imports: [CommonModule], 
  templateUrl: './patient-dashboard.html',
  styleUrls: ['./patient-dashboard.css'] 
})
export class PatientDashboard implements OnInit {
  
  medecins: any[] = [];
  
  // Signal for refresh
  private refreshRdvSignal$ = new BehaviorSubject<void>(undefined);
  
  // Observable for appointments
  mesRendezVous$: Observable<RdvState> = this.refreshRdvSignal$.pipe(
    switchMap(() => {
      const username = this.authService.getUsername();
      console.log("Tentative de récupération des RDV pour :", username);
      
      return this.rdvService.getRdvByPatientUsername(username).pipe(
        tap(data => console.log("Données reçues du serveur :", data)),
        map(data => ({ rdvs: data, loading: false, error: null })),
        startWith({ rdvs: [], loading: true, error: null }),
        catchError(err => {
          console.error("Erreur API :", err);
          return of({ rdvs: [], loading: false, error: 'Erreur' });
        })
      );
    })
  );

  constructor(
    public authService: AuthService,
    private medecinService: MedecinService,
    private rdvService: RendezVousService
  ) {}

  ngOnInit(): void {
    this.loadMedecins();
  }

  // Scroll to top of page
  scrollToTop(): void {
    const welcomeBanner = document.querySelector('.welcome-banner');
    if (welcomeBanner) {
      welcomeBanner.scrollIntoView({ behavior: 'smooth' });
    }
  }

  // Scroll to doctors section
  scrollToDoctors(): void {
    const doctorsTable = document.querySelector('.doctors-table');
    if (doctorsTable) {
      doctorsTable.scrollIntoView({ behavior: 'smooth' });
    }
  }

  loadMedecins(): void {
    this.medecinService.getAllMedecins().subscribe({
      next: (data) => {
        this.medecins = data;
      },
      error: (err) => {
        console.error('Erreur lors du chargement des médecins', err);
      }
    });
  }

  voirMonRapport(rdv: any): void {
  // On appelle le service pour récupérer la consultation
  this.rdvService.getConsultationByRdvId(rdv.id).subscribe({
    next: (consultation) => {
      Swal.fire({
        title: 'Mon Rapport Médical',
        icon: 'info',
        html: `
          <div style="text-align: left; padding: 10px; border: 1px solid #eee; border-radius: 8px; background: #fdfdfd;">
            <p style="margin-bottom: 15px;"><strong>👨‍⚕️ Médecin :</strong> ${rdv.medecin.nomComplet}</p>
            <p style="margin-bottom: 5px; color: #2c3e50;"><strong>📝 Diagnostic :</strong></p>
            <div style="background: #f1f2f6; padding: 10px; border-radius: 5px; margin-bottom: 15px;">
              ${consultation.diagnostic}
            </div>
            <p style="margin-bottom: 5px; color: #e67e22;"><strong>💊 Ordonnance :</strong></p>
            <div style="background: #fdf2e9; padding: 10px; border-radius: 5px; border-left: 4px solid #e67e22; white-space: pre-wrap;">
              ${consultation.ordonnance}
            </div>
            <p style="margin-top: 20px; font-size: 0.8em; color: #7f8c8d; text-align: center;">
              Date de consultation : ${new Date(consultation.dateConsultation).toLocaleDateString()}
            </p>
          </div>
        `,
        confirmButtonText: 'Fermer',
        confirmButtonColor: '#3498db',
        width: '600px'
      });
    },
    error: (err) => {
      console.error(err);
      Swal.fire('Erreur', 'Impossible de charger le rapport médical.', 'error');
    }
  });
}


  async ouvrirFormulaireRDV(medecin: any): Promise<void> {
    const username = this.authService.getUsername();
    
    // Get current date and time
    const now = new Date();
    const minDate = now.toISOString().slice(0, 16);
    
    // Calculate max date (6 months from now)
    const maxDate = new Date(now.getFullYear(), now.getMonth() + 6, now.getDate());
    const maxDateString = maxDate.toISOString().slice(0, 16);

    // Formulaire SweetAlert
    const { value: formValues } = await Swal.fire({
      title: `Prendre RDV avec ${medecin.nomComplet || medecin.nom}`,
      icon: 'info',
      html:
        `<div style="text-align: left; font-weight: bold; margin-bottom: 5px;">Date et Heure :</div>
         <input id="rdv-date" 
                type="datetime-local" 
                class="swal2-input"
                min="${minDate}"
                max="${maxDateString}"
                required>
         <div style="text-align: left; font-weight: bold; margin-top: 15px; margin-bottom: 5px;">Motif :</div>
         <input id="rdv-motif" 
                type="text" 
                class="swal2-input" 
                placeholder="Ex: Consultation générale, Douleur abdominale..."
                required>`,
      focusConfirm: false,
      showCancelButton: true,
      confirmButtonText: 'Confirmer',
      cancelButtonText: 'Annuler',
      confirmButtonColor: '#27ae60',
      showLoaderOnConfirm: true,
      preConfirm: () => {
        const dateInput = document.getElementById('rdv-date') as HTMLInputElement;
        const motifInput = document.getElementById('rdv-motif') as HTMLInputElement;
        
        if (!dateInput.value || !motifInput.value) {
          Swal.showValidationMessage('Veuillez remplir tous les champs');
          return false;
        }
        
        // Validate date is in future
        const selectedDate = new Date(dateInput.value);
        if (selectedDate <= now) {
          Swal.showValidationMessage('Veuillez choisir une date future');
          return false;
        }
        
        return {
          dateHeure: dateInput.value,
          motif: motifInput.value
        };
      }
    });

    if (formValues) {
      const dataRDV = {
        dateHeure: formValues.dateHeure,
        motif: formValues.motif,
        statut: 'EN_ATTENTE',
        patientUsername: username,
        medecinId: medecin.id || medecin.medecinId
      };

      console.log('📤 Envoi du RDV:', dataRDV);

      this.rdvService.prendreRendezVous(dataRDV).subscribe({
        next: (response) => {
          Swal.fire({
            title: 'Demande envoyée !',
            text: 'Votre demande de rendez-vous est en attente de confirmation.',
            icon: 'success',
            confirmButtonColor: '#27ae60'
          });
          
          // Refresh appointments list
          this.refreshRdvSignal$.next(); 
        },
        error: (err) => {
          console.error('❌ Erreur:', err);
          Swal.fire({
            title: 'Erreur',
            text: err.error?.message || 'Impossible d\'enregistrer le rendez-vous. Veuillez réessayer.',
            icon: 'error',
            confirmButtonText: 'OK'
          });
        }
      });
    }
  }
}