import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms'; 
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true, 
  imports: [FormsModule, CommonModule, RouterLink], 
  templateUrl: './login.html',
  styleUrls: ['./login.css']
})
export class LoginComponent {
  credentials = { username: '', password: '' };
  errorMessage = '';
  isLoading = false; //loader animation

  constructor(private authService: AuthService, private router: Router) {}

  onLogin() {
    //reset error message and set loading to true
    this.errorMessage = '';
    this.isLoading = true;

    this.authService.login(this.credentials).subscribe({
      next: (res) => {
        this.isLoading = false; // Stop loading on success
        const role = res.role;

        if (role === 'ADMIN') {
          this.router.navigate(['/patients']);
        } else if (role === 'MEDECIN') {
          this.router.navigate(['/medecin-dashboard']);
        } else if (role === 'PATIENT') {
          this.router.navigate(['/patient-dashboard']);
        }
      },
      error: (err) => {
        this.isLoading = false; // Stop loading on error
        this.errorMessage = "Identifiants incorrects";
        console.error('Login error:', err);
      }
    });
  }
}