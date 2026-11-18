import { Component, OnInit, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { mensajeSinConexion } from '../../configuracion';
import { Turno } from '../../models/turno';
import { TurnoService } from '../../services/turno.service';

@Component({
  selector: 'app-panel-atencion',
  imports: [ReactiveFormsModule],
  templateUrl: './panel-atencion.html',
  styleUrl: './panel-atencion.css',
})
export class PanelAtencion implements OnInit {
  protected readonly turno = signal<Turno | null>(null);
  protected readonly cargando = signal(false);
  protected readonly procesando = signal(false);
  protected readonly mensajeError = signal('');
  protected readonly formulario = new FormGroup({
    equipo: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required, Validators.pattern(/\S/)],
    }),
  });

  constructor(private turnoService: TurnoService) {}

  ngOnInit(): void {
    this.cargarSiguiente();
  }

  protected cargarSiguiente(): void {
    this.cargando.set(true);
    this.mensajeError.set('');

    this.turnoService.listarTurnos('en_espera').subscribe({
      next: (turnos) => {
        this.turno.set(turnos.length > 0 ? turnos[0] : null);
        this.cargando.set(false);
      },
      error: (error) => {
        this.turno.set(null);
        this.cargando.set(false);
        this.mensajeError.set(error.error?.mensaje ?? mensajeSinConexion);
      },
    });
  }

  protected marcarRetirado(): void {
    const turno = this.turno();
    if (!turno) {
      return;
    }
    if (this.formulario.invalid) {
      this.formulario.markAllAsTouched();
      return;
    }

    this.procesando.set(true);
    this.mensajeError.set('');

    const equipo = this.formulario.controls.equipo.value.trim();
    this.turnoService.actualizarEstado(turno._id, 'retirado', equipo).subscribe({
      next: () => {
        this.procesando.set(false);
        this.formulario.reset();
        this.cargarSiguiente();
      },
      error: (error) => {
        this.procesando.set(false);
        this.mensajeError.set(error.error?.mensaje ?? mensajeSinConexion);
      },
    });
  }

  protected cancelarTurno(): void {
    const turno = this.turno();
    if (!turno) {
      return;
    }

    this.procesando.set(true);
    this.mensajeError.set('');

    this.turnoService.actualizarEstado(turno._id, 'cancelado').subscribe({
      next: () => {
        this.procesando.set(false);
        this.formulario.reset();
        this.cargarSiguiente();
      },
      error: (error) => {
        this.procesando.set(false);
        this.mensajeError.set(error.error?.mensaje ?? mensajeSinConexion);
      },
    });
  }
}