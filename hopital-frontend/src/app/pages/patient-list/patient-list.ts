import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PatientService } from '../../services/patient.service';
import { Patient } from '../../models/patient.model';
import { Observable, catchError, of, map, startWith, BehaviorSubject, switchMap } from 'rxjs'; 
import { RouterLink } from '@angular/router';

interface PatientListState {
  patients: Patient[];
  loading: boolean;
  error: string | null;
}

@Component({
  selector: 'app-patient-list',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './patient-list.html',
  styleUrl: './patient-list.css'
})
export class PatientListComponent implements OnInit {

  // déclencheur pour charger les données
  private refreshSignal$ = new BehaviorSubject<void>(undefined);

  patientsState$: Observable<PatientListState> = this.refreshSignal$.pipe(
    switchMap(() => this.patientService.getPatients().pipe(
      map(data => ({ patients: data, loading: false, error: null })),
      startWith({ patients: [], loading: true, error: null }),
      catchError(err => {
        console.error(err);
        return of({ patients: [], loading: false, error: 'Failed to load patients' });
      })
    ))
  );

  constructor(private patientService: PatientService) {}

  ngOnInit(): void {
  
  }

  deletePatient(id: number): void {
    if (confirm('Êtes-vous sûr de vouloir supprimer ce patient ?')) {
      this.patientService.deletePatient(id).subscribe({
        next: () => {
          console.log(`Patient ${id} supprimé.`);
          // emission d'une nouvelle valeur pour forcer le rechargement automatique
          this.refreshSignal$.next(); 
        },
        error: (err) => {
          console.error('Erreur lors de la suppression:', err);
          alert("Erreur lors de la suppression.");
        }
      });
    }
  }
}