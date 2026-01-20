import { Routes } from '@angular/router';
import { PatientListComponent } from './pages/patient-list/patient-list';
import { PatientAddComponent } from './components/patient-add/patient-add';
import { PatientEditComponent } from './components/patient-edit/patient-edit'; 
import { LoginComponent } from './pages/login/login'; 
import { authGuard } from './auth.guard';
import { RegisterComponent } from './pages/register/register';
import { PatientDashboard } from './pages/patient-dashboard/patient-dashboard';
import { MedecinDashboard } from './pages/medecin-dashboard/medecin-dashboard';
import { MedecinManagementComponent } from './pages/medecin-management/medecin-management';

export const routes: Routes = [
    // Routes publiques
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent },

    // Route commune pour la liste (ADMIN et MEDECIN)
    { 
        path: 'patients', 
        component: PatientListComponent, 
        canActivate: [authGuard], 
        data: { roles: ['ADMIN', 'MEDECIN'] } 
    },

    // Route spécifique au PATIENT
    { 
        path: 'patient-dashboard', 
        component: PatientDashboard, 
        canActivate: [authGuard], 
        data: { roles: ['PATIENT', 'ADMIN'] } 
    },

    // Route spécifique au MEDECIN (Dashboard propre)
    { 
        path: 'medecin-dashboard', 
        component: MedecinDashboard, 
        canActivate: [authGuard], 
        data: { roles: ['MEDECIN', 'ADMIN'] } 
    },

    // Actions d'écriture réservées à l'ADMIN& MEDECIN
    { 
        path: 'patients/add', 
        component: PatientAddComponent, 
        canActivate: [authGuard], 
        data: { roles: ['ADMIN', 'MEDECIN'] } 
    },
    { 
        path: 'patients/edit/:id', 
        component: PatientEditComponent, 
        canActivate: [authGuard], 
        data: { roles: ['ADMIN', 'MEDECIN'] } 
    },


{ 
  path: 'admin/medecins', 
  component: MedecinManagementComponent, 
  canActivate: [authGuard], 
  data: { roles: ['ADMIN'] } 
},

    // Redirections
    { path: '', redirectTo: '/login', pathMatch: 'full' },
    { path: '**', redirectTo: '/login' }

];