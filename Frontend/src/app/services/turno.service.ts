import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { urlBaseApi } from '../configuracion';
import { Turno } from '../models/turno';

@Injectable({ providedIn: 'root' })
export class TurnoService {
  private readonly urlTurnos = `${urlBaseApi}/turnos`;

  constructor(private http: HttpClient) {}

  crearTurno(datos: { nombre: string; dni: string; curso: string }): Observable<Turno> {
    return this.http.post<Turno>(this.urlTurnos, datos);
  }

  listarTurnos(estado?: string): Observable<Turno[]> {
    const url = estado ? `${this.urlTurnos}?estado=${estado}` : this.urlTurnos;
    return this.http.get<Turno[]>(url);
  }

  obtenerTurno(id: string): Observable<Turno> {
    return this.http.get<Turno>(`${this.urlTurnos}/${id}`);
  }

  actualizarEstado(id: string, estado: string, equipo?: string): Observable<Turno> {
    const datos: { estado: string; equipo?: string } = { estado };
    if (equipo) {
      datos.equipo = equipo;
    }
    return this.http.patch<Turno>(`${this.urlTurnos}/${id}/estado`, datos);
  }

  eliminarTurno(id: string): Observable<{ mensaje: string }> {
    return this.http.delete<{ mensaje: string }>(`${this.urlTurnos}/${id}`);
  }
}