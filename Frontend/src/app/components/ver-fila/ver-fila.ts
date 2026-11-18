import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { TurnoService } from '../../services/turno.service';
import { Turno, EstadoTurno } from '../../models/turno';
import { EstadoTextoPipe } from '../../pipes/estado-texto.pipe';

@Component({
  selector: 'app-ver-fila',
  imports: [CommonModule, FormsModule, EstadoTextoPipe],
  templateUrl: './ver-fila.html',
  styleUrl: './ver-fila.css'
})
export class VerFila implements OnInit {

  private turnoService = inject(TurnoService);

  turnos: Turno[] = [];
  estadoSeleccionado = '';
  cargando = false;
  error = '';

  ngOnInit(): void {
    this.cargarTurnos();
  }

  cargarTurnos(): void {
    this.cargando = true;
    this.error = '';

    const estado = this.estadoSeleccionado
      ? this.estadoSeleccionado as EstadoTurno
      : undefined;

    this.turnoService.listarTurnos(estado).subscribe({
      next: (datos) => {
        this.turnos = datos;
        this.cargando = false;
      },
      error: () => {
        this.error = 'No se pudieron cargar los turnos';
        this.turnos = [];
        this.cargando = false;
      }
    });
  }
}