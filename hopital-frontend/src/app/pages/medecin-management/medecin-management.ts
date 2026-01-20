import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MedecinService } from '../../services/medecin';
import Swal from 'sweetalert2';
import { ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-medecin-management',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './medecin-management.html',
  styleUrls: ['./medecin-management.css'] 
})
export class MedecinManagementComponent implements OnInit {
  medecins: any[] = [];
  loading: boolean = true;

  constructor(
    private medecinService: MedecinService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.loadMedecins();
  }

  loadMedecins() {
    this.loading = true;
    this.medecinService.getAllMedecins().subscribe({
      next: (data) => {
        this.medecins = data || [];
        this.loading = false;
        this.cdr.detectChanges();
      },
      error: (err) => {
        console.error("Erreur de chargement", err);
        this.loading = false;
        this.cdr.detectChanges();
      }
    });
  }

  // Get doctor initials for avatar
  getDoctorInitials(fullName: string): string {
    if (!fullName) return 'DR';
    
    const names = fullName.split(' ');
    if (names.length >= 2) {
      return (names[0].charAt(0) + names[1].charAt(0)).toUpperCase();
    } else if (names.length === 1) {
      return names[0].substring(0, 2).toUpperCase();
    }
    return 'DR';
  }

  // Get unique specialties count
  getUniqueSpecialties(): string[] {
    const specialties = this.medecins.map(m => m.specialite);
    return [...new Set(specialties.filter(s => s))];
  }

  // Get active doctors count (all doctors are considered active)
  getActiveDoctorsCount(): number {
    return this.medecins.length;
  }

  // Get total patients capacity
  getTotalPatientsCapacity(): number {
    // assuming that each doctor can handle 20 patients
    return this.medecins.length * 20;
  }

  // add doctor with enhanced SweetAlert2 modal
  async openAddModal() {
    const { value: formValues } = await Swal.fire({
      title: '👨‍⚕️ Ajouter un Médecin Autorisé',
      html: `
        <div style="text-align: left; margin-bottom: 20px;">
          <p style="color: #666; font-size: 0.9rem;">Remplissez les informations du médecin</p>
        </div>
        <div class="form-group" style="margin-bottom: 15px;">
          <label style="display: block; margin-bottom: 5px; color: #333; font-weight: 500;">CIN *</label>
          <input id="swal-input1" class="swal2-input" placeholder="Numéro de CIN" required>
        </div>
        <div class="form-group" style="margin-bottom: 15px;">
          <label style="display: block; margin-bottom: 5px; color: #333; font-weight: 500;">Nom Complet *</label>
          <input id="swal-input2" class="swal2-input" placeholder="Dr. Nom Prénom" required>
        </div>
        <div class="form-group" style="margin-bottom: 15px;">
          <label style="display: block; margin-bottom: 5px; color: #333; font-weight: 500;">Spécialité *</label>
          <input id="swal-input3" class="swal2-input" placeholder="Ex: Cardiologie, Pédiatrie..." required>
        </div>
        <div class="form-group" style="margin-bottom: 15px;">
          <label style="display: block; margin-bottom: 5px; color: #333; font-weight: 500;">Email *</label>
          <input id="swal-input4" class="swal2-input" placeholder="email@exemple.com" type="email" required>
        </div>
      `,
      background: '#ffffff',
      showCancelButton: true,
      confirmButtonColor: '#4A90E2',
      cancelButtonColor: '#95a5a6',
      confirmButtonText: `
        <span style="display: flex; align-items: center; gap: 8px;">
          <i class="fas fa-user-plus"></i>
          Ajouter le Médecin
        </span>
      `,
      cancelButtonText: 'Annuler',
      showLoaderOnConfirm: true,
      preConfirm: () => {
        const cin = (document.getElementById('swal-input1') as HTMLInputElement).value;
        const nomComplet = (document.getElementById('swal-input2') as HTMLInputElement).value;
        const specialite = (document.getElementById('swal-input3') as HTMLInputElement).value;
        const email = (document.getElementById('swal-input4') as HTMLInputElement).value;

        if (!cin || !nomComplet || !specialite || !email) {
          Swal.showValidationMessage('Veuillez remplir tous les champs obligatoires');
          return false;
        }

        return { cin, nomComplet, specialite, email };
      }
    });

    if (formValues) {
      this.medecinService.addMedecin(formValues).subscribe({
        next: () => {
          this.loadMedecins();
          Swal.fire({
            title: '✅ Succès',
            html: `
              <div style="text-align: center; padding: 10px;">
                <div style="width: 60px; height: 60px; margin: 0 auto 15px; background: #7ED321; border-radius: 50%; display: flex; align-items: center; justify-content: center;">
                  <i class="fas fa-check" style="font-size: 2rem; color: white;"></i>
                </div>
                <h3 style="margin-bottom: 10px; color: #333;">Médecin ajouté</h3>
                <p style="color: #666;">Le médecin a été ajouté à la liste blanche avec succès.</p>
              </div>
            `,
            confirmButtonColor: '#7ED321'
          });
        },
        error: (err) => {
          console.error(err);
          Swal.fire({
            title: '❌ Erreur',
            text: 'Impossible d\'ajouter le médecin. Veuillez réessayer.',
            icon: 'error',
            confirmButtonColor: '#FF6B6B'
          });
        }
      });
    }
  }

  // Delete doctor with enhanced confirmation
  deleteMedecin(id: number) {
    Swal.fire({
      title: 'Supprimer ce médecin ?',
      html: `
        <div style="text-align: center; padding: 20px;">
          <div style="width: 80px; height: 80px; margin: 0 auto 20px; background: linear-gradient(135deg, #FF6B6B, #FF4757); border-radius: 50%; display: flex; align-items: center; justify-content: center;">
            <i class="fas fa-exclamation-triangle" style="font-size: 2.5rem; color: white;"></i>
          </div>
          <h3 style="margin-bottom: 10px; color: #333;">Confirmer la suppression</h3>
          <p style="color: #666; line-height: 1.6;">
            Ce médecin ne pourra plus s'inscrire dans le système. Cette action est irréversible.
          </p>
        </div>
      `,
      showCancelButton: true,
      confirmButtonColor: '#FF6B6B',
      cancelButtonColor: '#95a5a6',
      confirmButtonText: `
        <span style="display: flex; align-items: center; gap: 8px;">
          <i class="fas fa-trash-alt"></i>
          Oui, supprimer
        </span>
      `,
      cancelButtonText: 'Annuler',
      backdrop: 'rgba(0,0,0,0.4)',
      width: '500px'
    }).then((result) => {
      if (result.isConfirmed) {
        this.medecinService.deleteMedecin(id).subscribe({
          next: () => {
            this.loadMedecins();
            Swal.fire({
              title: '✅ Supprimé',
              text: 'Le médecin a été retiré de la liste.',
              icon: 'success',
              confirmButtonColor: '#4A90E2'
            });
          },
          error: (err) => {
            console.error(err);
            Swal.fire({
              title: '❌ Erreur',
              text: 'Impossible de supprimer le médecin.',
              icon: 'error',
              confirmButtonColor: '#FF6B6B'
            });
          }
        });
      }
    });
  }

  // Edit doctor with enhanced modal
  async editMedecin(medecin: any) {
    const { value: formValues } = await Swal.fire({
      title: '✏️ Modifier le Médecin',
      html: `
        <div style="text-align: left; margin-bottom: 20px;">
          <p style="color: #666; font-size: 0.9rem;">Modifiez les informations du médecin</p>
        </div>
        <div class="form-group" style="margin-bottom: 15px;">
          <label style="display: block; margin-bottom: 5px; color: #333; font-weight: 500;">CIN *</label>
          <input id="swal-input1" class="swal2-input" placeholder="Numéro de CIN" value="${medecin.cin}" required>
        </div>
        <div class="form-group" style="margin-bottom: 15px;">
          <label style="display: block; margin-bottom: 5px; color: #333; font-weight: 500;">Nom Complet *</label>
          <input id="swal-input2" class="swal2-input" placeholder="Dr. Nom Prénom" value="${medecin.nomComplet}" required>
        </div>
        <div class="form-group" style="margin-bottom: 15px;">
          <label style="display: block; margin-bottom: 5px; color: #333; font-weight: 500;">Spécialité *</label>
          <input id="swal-input3" class="swal2-input" placeholder="Ex: Cardiologie, Pédiatrie..." value="${medecin.specialite}" required>
        </div>
        <div class="form-group" style="margin-bottom: 15px;">
          <label style="display: block; margin-bottom: 5px; color: #333; font-weight: 500;">Email *</label>
          <input id="swal-input4" class="swal2-input" placeholder="email@exemple.com" type="email" value="${medecin.email}" required>
        </div>
      `,
      background: '#ffffff',
      showCancelButton: true,
      confirmButtonColor: '#4A90E2',
      cancelButtonColor: '#95a5a6',
      confirmButtonText: `
        <span style="display: flex; align-items: center; gap: 8px;">
          <i class="fas fa-save"></i>
          Enregistrer les modifications
        </span>
      `,
      cancelButtonText: 'Annuler',
      showLoaderOnConfirm: true,
      preConfirm: () => {
        const cin = (document.getElementById('swal-input1') as HTMLInputElement).value;
        const nomComplet = (document.getElementById('swal-input2') as HTMLInputElement).value;
        const specialite = (document.getElementById('swal-input3') as HTMLInputElement).value;
        const email = (document.getElementById('swal-input4') as HTMLInputElement).value;

        if (!cin || !nomComplet || !specialite || !email) {
          Swal.showValidationMessage('Veuillez remplir tous les champs obligatoires');
          return false;
        }

        return { cin, nomComplet, specialite, email };
      }
    });

    if (formValues) {
      this.medecinService.updateMedecin(medecin.id, formValues).subscribe({
        next: () => {
          this.loadMedecins();
          Swal.fire({
            title: '✅ Mis à jour',
            text: 'Les informations ont été modifiées avec succès.',
            icon: 'success',
            confirmButtonColor: '#7ED321'
          });
        },
        error: (err) => {
          console.error(err);
          Swal.fire({
            title: '❌ Erreur',
            text: 'Impossible de modifier le médecin.',
            icon: 'error',
            confirmButtonColor: '#FF6B6B'
          });
        }
      });
    }
  }
}