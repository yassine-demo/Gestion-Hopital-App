import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router, RouterLink } from '@angular/router';
import Swal from 'sweetalert2'; // Import de SweetAlert2

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './register.html',
  styleUrls: ['./register.css']
})
export class RegisterComponent {
  user: any = { 
    username: '', 
    password: '', 
    role: 'PATIENT', 
    cin: '', 
    nomComplet: '',
    adresse: '',
    telephone: '',
    specialite: '' 
  };
  
  isLoading = false; // Pour désactiver le bouton pendant l'envoi

  constructor(private authService: AuthService, private router: Router) {}

  onRegister() {
    this.isLoading = true;

    const data: any = {
      username: this.user.username,
      password: this.user.password,
      role: this.user.role.toUpperCase(),
      nomComplet: this.user.nomComplet,
      cin: this.user.cin
    };

    if (this.user.role === 'MEDECIN') {
      data.specialite = this.user.specialite;
    }

    this.authService.register(data).subscribe({
  next: (res) => {
    this.isLoading = false;
    Swal.fire({
      title: 'Succès !',
      text: 'Votre compte a été créé. Vous pouvez maintenant vous connecter.',
      icon: 'success',
      confirmButtonColor: '#27ae60'
    }).then(() => {
      this.router.navigate(['/login']);
    });
  },
  error: (err) => {
    this.isLoading = false;
    console.error("Détail de l'erreur :", err);

   
    let errorMsg = "Une erreur est survenue lors de l'inscription.";
    
    if (err.error && typeof err.error === 'string') {
      errorMsg = err.error;
    } else if (err.error && err.error.message) {
      errorMsg = err.error.message;
    }

    Swal.fire({
      title: 'Erreur',
      text: errorMsg,
      icon: 'error',
      confirmButtonText: 'Réessayer'
    });
  }
});
  }
}