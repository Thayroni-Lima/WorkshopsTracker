import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Colaborador } from '../../models/colaborador.model';
import { Workshop } from '../../models/workshop.model';

@Injectable({
  providedIn: 'root',
})
export class WorkshopService {
  private apiUrl = 'http://localhost:5064/api/workshops';

  constructor(private http: HttpClient) {}

  getAll(): Observable<Workshop[]> {
    return this.http.get<Workshop[]>(this.apiUrl);
  }

  getById(id: number): Observable<Workshop> {
    return this.http.get<Workshop>(`${this.apiUrl}/${id}`);
  }

  create(workshop: Workshop): Observable<Workshop> {
    return this.http.post<Workshop>(this.apiUrl, workshop);
  }

  update(id: number, workshop: Workshop): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/${id}`, workshop);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  getColaboradoresByWorkshopId(workshopId: number): Observable<Colaborador[]> {
    return this.http.get<Colaborador[]>(`${this.apiUrl}/${workshopId}/colaboradores`);
  }

  postColaboradorToWorkshop(workshopId: number, colaboradorId: number): Observable<void> {
    return this.http.post<void>(`${this.apiUrl}/${workshopId}/colaboradores/${colaboradorId}`, {});
  }

  deleteColaboradorFromWorkshop(workshopId: number, colaboradorId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${workshopId}/colaboradores/${colaboradorId}`);
  }
}
