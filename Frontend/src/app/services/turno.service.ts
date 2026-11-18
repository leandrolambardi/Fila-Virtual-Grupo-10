import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Turno, EstadoTurno } from '../models/turno';
import { configuracion } from '../configuracion';

@Injectable({
  providedIn: 'root'
})
export class TurnoService {

  private http = inject(HttpClient);

  private url = `${configuracion.apiUrl}/turnos`;

  listarTurnos(estado?: EstadoTurno): Observable<Turno[]> {

    let params = new HttpParams();

    if (estado) {
      params = params.set('estado', estado);
    }

    return this.http.get<Turno[]>(this.url, { params });
  }
}