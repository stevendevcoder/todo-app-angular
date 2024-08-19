import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Proyect } from '../models/Proyect';

@Injectable({
  providedIn: 'root',
})
export class ProyectsService {
  private apiURL = 'http://localhost:5135/api/Proyects';

  constructor(private http: HttpClient) {}

  getProyects(): Observable<Proyect[]> {
    return this.http.get<Proyect[]>(this.apiURL);
  }

  getProyect(id: number): Observable<Proyect> {
    return this.http.get<Proyect>(`${this.apiURL}/${id}`);
  }

  addProyect(proyect: Proyect): Observable<Proyect> {
    return this.http.post<Proyect>(this.apiURL, proyect);
  }

  updateProyect(id: number, proyect: Proyect): Observable<any> {
    return this.http.put(`${this.apiURL}/${id}`, proyect);
  }

  deleteProyect(id: number): Observable<any> {
    return this.http.delete(`${this.apiURL}/${id}`);
  }
}
