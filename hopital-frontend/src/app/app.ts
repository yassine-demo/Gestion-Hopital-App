import { Component } from '@angular/core';
import { Router, RouterOutlet, RouterLink } from '@angular/router';
import { AuthService } from './services/auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink, CommonModule],
  templateUrl: './app.html',
  styleUrls: ['./app.css']
})
export class App {
  title = 'Hôpital Plus';

  constructor(public authService: AuthService, private router: Router) {}

  getUserDisplayName(): string {
    const nomComplet = this.authService.getNomComplet();
    const username = this.authService.getUsername();
    
    if (nomComplet && nomComplet.trim() !== '') {
      return nomComplet;
    } else if (username && username.trim() !== '') {
      return username;
    } else {
      const role = this.authService.getRole();
      return role || 'Utilisateur';
    }
  }

  // Method to get role-specific color
  getRoleColor(): string {
    const role = this.authService.getRole();
    switch(role) {
      case 'ADMIN':
        return 'linear-gradient(135deg, #e74c3c, #c0392b)';
      case 'MEDECIN':
        return 'linear-gradient(135deg, #4A90E2, #357ABD)';
      case 'PATIENT':
        return 'linear-gradient(135deg, #7ED321, #6BB820)';
      default:
        return 'linear-gradient(135deg, #95a5a6, #7f8c8d)';
    }
  }

  // Logout method
  onLogout() {
    // Show confirmation dialog
    if (confirm('Êtes-vous sûr de vouloir vous déconnecter ?')) {
      this.authService.logout();
      this.router.navigate(['/login']);
    }
  }
}