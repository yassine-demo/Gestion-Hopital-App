import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from './services/auth.service';

export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const authService = inject(AuthService);

  // 1. Vérifier si l'utilisateur est authentifié
  if (!authService.isLoggedIn()) {
    console.warn('Accès refusé : Utilisateur non connecté');
    router.navigate(['/login']);
    return false;
  }

  // 2. Récupérer le rôle de l'utilisateur
  const userRole = authService.getRole();

  // 3. Récupérer les rôles autorisés pour cette route (définis dans app.routes.ts)
  const expectedRoles = route.data['roles'] as Array<string>;

  console.log('Rôle utilisateur:', userRole);
console.log('Rôles autorisés pour cette page:', expectedRoles);

  // 4. Vérifier si l'utilisateur a le bon rôle
  // Si la route n'a pas de restriction on laisse passer
  if (expectedRoles && expectedRoles.length > 0) {
    if (!userRole || !expectedRoles.includes(userRole)) {
      console.error(`Accès interdit : Le rôle ${userRole} n'est pas autorisé ici.`);
      
      // Redirection intelligente selon le rôle si accès refusé
      if (userRole === 'PATIENT') {
        router.navigate(['/patient-dashboard']);
      } else if (userRole === 'MEDECIN') {
        router.navigate(['/medecin-dashboard']);
      } else {
        router.navigate(['/login']);
      }
      return false;
    }
  }

  return true;
};