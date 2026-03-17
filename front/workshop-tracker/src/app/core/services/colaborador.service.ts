import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Colaborador } from '../../models/colaborador.model';
import { Workshop } from '../../models/workshop.model';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ColaboradorService {
  private apiUrl = `${environment.apiUrl}/api/colaboradores`;

  constructor(private http: HttpClient) {}

  getAll(): Observable<Colaborador[]> {
    return this.http.get<Colaborador[]>(this.apiUrl);
  }

  getById(id: number): Observable<Colaborador> {
    return this.http.get<Colaborador>(`${this.apiUrl}/${id}`);
  }

  create(colaborador: Colaborador): Observable<Colaborador> {
    return this.http.post<Colaborador>(this.apiUrl, colaborador);
  }

  update(id: number, colaborador: Colaborador): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/${id}`, colaborador);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  getWorkshopsByColaboradorId(colaboradorId: number): Observable<Workshop[]> {
    return this.http.get<Workshop[]>(`${this.apiUrl}/${colaboradorId}/workshops`);
  }
}
