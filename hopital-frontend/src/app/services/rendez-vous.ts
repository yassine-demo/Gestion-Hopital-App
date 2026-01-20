import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'; // Ajout de HttpHeaders
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class RendezVousService {
  private apiUrl = 'http://localhost:8080/api/rendez-vous';

  constructor(private http: HttpClient) { }

  // Helper pour centraliser la création des headers
  private getHeaders() {
    const token = localStorage.getItem('token');
    return new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    });
  }

  prendreRendezVous(rdv: any): Observable<any> {
    return this.http.post(this.apiUrl, rdv, { headers: this.getHeaders() });
  }

  getRdvByPatientUsername(username: string): Observable<any[]> {
    // L'URL ici doit correspondre exactement à celle du Controller
    return this.http.get<any[]>(`${this.apiUrl}/patient/username/${username}`, { headers: this.getHeaders() });
  }

  getRdvByMedecin(medecinId: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/medecin/${medecinId}`, { headers: this.getHeaders() });
  }

  getRdvByPatient(patientId: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/patient/${patientId}`, { headers: this.getHeaders() });
  }

  terminerConsultation(rdvId: number, data: any): Observable<any> {
  const token = localStorage.getItem('token');
  const headers = { 'Authorization': `Bearer ${token}` };
  return this.http.post(`${this.apiUrl}/${rdvId}/terminer`, data, { headers });
}

  getConsultationByRdvId(rdvId: number): Observable<any> {
  const token = localStorage.getItem('token');
  const headers = { 'Authorization': `Bearer ${token}` };
  return this.http.get(`${this.apiUrl}/${rdvId}/consultation`, { headers });
}

  updateStatut(rdvId: number, statut: string): Observable<any> {
    // On passe l'objet { statut } pour le @RequestBody du Java
    return this.http.put(`${this.apiUrl}/${rdvId}/statut`, { statut }, { headers: this.getHeaders() });
  }
}