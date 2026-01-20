import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:8080/api/auth';

  constructor(private http: HttpClient) { }

  login(credentials: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, credentials).pipe(
      tap((response: any) => {
        localStorage.setItem('token', response.token);
        localStorage.setItem('role', response.role);
        localStorage.setItem('username', response.username); // ← "fatma"
        localStorage.setItem('nomComplet', response.nomComplet); // ← "fatma tounsi"
      })
    );
  }

  getNomComplet(): string {
    const nom = localStorage.getItem('nomComplet');
    return (nom && nom !== 'null') ? nom : 'Administrateur'; 
  }

  getUsername(): string {
    return localStorage.getItem('username') || '';
  }

  getDisplayName(): string {
    return localStorage.getItem('nomComplet') || localStorage.getItem('username') || 'Utilisateur';
  }

  register(user: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/register`, user);
  }

  logout() {
    localStorage.clear();
  }

  getRole(): string {
    const role = localStorage.getItem('role');
    return role ? role : ''; 
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('token');
  }
}