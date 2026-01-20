import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { PatientService } from '../../services/patient.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-patient-add',
  standalone: true,

  imports: [CommonModule, ReactiveFormsModule], 
  templateUrl: './patient-add.html',
  styleUrls: ['./patient-add.css']
})
export class PatientAddComponent implements OnInit {
  patientForm!: FormGroup;
  errorMessage: string = '';

  constructor(
    private fb: FormBuilder,
    private patientService: PatientService,
    public router: Router
  ) {}

  ngOnInit(): void {
    this.patientForm = this.fb.group({
      nom: ['', Validators.required],
      prenom: ['', Validators.required],
      dateNaissance: ['', Validators.required],
      telephone: ['', [Validators.required, Validators.pattern('^[0-9]+$')]],
      adresse: ['', Validators.required]
    });
  }


  get f() {
    return this.patientForm.controls;
  }

  onSubmit(): void {
    this.errorMessage = '';
    
    // on verifie si le formulaire est valide avant l'envoi
    if (this.patientForm.invalid) {
      this.patientForm.markAllAsTouched();
      return;
    }

    // Appel du service de création
    this.patientService.createPatient(this.patientForm.value).subscribe({
      next: (patient) => {
        console.log('Patient ajouté avec succès', patient);
        // redirection vers la liste des patients après succès
        this.router.navigate(['/patients']); 
      },
      error: (err) => {
        this.errorMessage = 'Erreur lors de l\'ajout du patient.';
        console.error('Erreur Backend:', err);
      }
    });
  }
}