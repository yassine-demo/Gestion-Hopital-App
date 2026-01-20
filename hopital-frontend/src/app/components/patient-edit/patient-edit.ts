import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { PatientService } from '../../services/patient.service';
import { ActivatedRoute, Router } from '@angular/router'; // ActivatedRoute pour lire l'ID
import { Patient } from '../../models/patient.model';

@Component({
  selector: 'app-patient-edit',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule], 
  templateUrl: './patient-edit.html',
  styleUrls: ['./patient-edit.css']
})
export class PatientEditComponent implements OnInit {
  patientId!: number;
  patientForm!: FormGroup;
  errorMessage: string = '';
  loading = true; 
  patientExiste: boolean = true;

  constructor(
    private fb: FormBuilder,
    private patientService: PatientService,
    private route: ActivatedRoute, // Pour obtenir l'ID
    public router: Router
  ) {}

  ngOnInit(): void {

    this.patientForm = this.fb.group({
      id: [null], // Garder l'ID
      nom: ['', Validators.required],
      prenom: ['', Validators.required],
      dateNaissance: ['', Validators.required],
      telephone: ['', [Validators.required, Validators.pattern('^[0-9]+$')]],
      adresse: ['', Validators.required]
    });

    //Lire l'ID du patient dans l'URL
    this.patientId = Number(this.route.snapshot.paramMap.get('id'));
    console.log('ID du patient à charger:', this.patientId);
    //Charger les données du patient
    this.patientService.getPatientById(this.patientId).subscribe({
      next: (patient) => {
        //formater la date si nécessaire
        if (patient.dateNaissance && typeof patient.dateNaissance === 'string') {
            patient.dateNaissance = patient.dateNaissance.substring(0, 10); 
        }
        
        // remplissagee le formulaire avec les données du patient
        this.patientForm.patchValue(patient);
        this.patientExiste = true;
        this.loading = false;
      },
      error: (err) => {
        this.loading = false;
        if (err.status === 404) {
          this.patientExiste = false;
        }
      }
    });
  }

  get f() {
    return this.patientForm.controls;
  }

  onSubmit(): void {
    this.errorMessage = '';
    
    if (this.patientForm.invalid) {
      this.patientForm.markAllAsTouched();
      return;
    }
    
    const updatedPatient: Patient = this.patientForm.value;

    // Appel du service de mise à jour
    this.patientService.updatePatient(this.patientId, updatedPatient).subscribe({
      next: () => {
        console.log(`Patient ${this.patientId} mis à jour avec succès.`);
        // Redirige vers la liste après succès
        this.router.navigate(['/patients']); 
      },
      error: (err) => {
        this.errorMessage = 'Erreur lors de la modification du patient.';
        console.error('Erreur Backend:', err);
      }
    });
  }
}