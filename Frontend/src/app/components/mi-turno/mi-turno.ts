import { DatePipe } from '@angular/common';
import { Component, OnInit, signal } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { mensajeSinConexion } from '../../configuracion';
import { Turno } from '../../models/turno';
import { EstadoTextoPipe } from '../../pipes/estado-texto.pipe';
import { TurnoService } from '../../services/turno.service';

@Component({
  selector: 'app-mi-turno',
  imports: [DatePipe, RouterLink, EstadoTextoPipe],
  templateUrl: './mi-turno.html',
  styleUrl: './mi-turno.css',
})
export class MiTurno implements OnInit {
  protected readonly turno = signal<Turno | null>(null);
  protected readonly mensajeError = signal('');
  protected readonly confirmando = signal(false);
  protected readonly eliminado = signal(false);
  protected readonly mensajeResultado = signal('');
  private id = '';

  constructor(
    private route: ActivatedRoute,
    private turnoService: TurnoService
  ) {}

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id') ?? '';
    this.cargarTurno();
  }

  protected mostrarConfirmacion(): void {
    this.confirmando.set(true);
  }

  protected cancelarConfirmacion(): void {
    this.confirmando.set(false);
  }

  protected eliminarTurno(): void {
    this.confirmando.set(false);
    this.mensajeError.set('');

    this.turnoService.eliminarTurno(this.id).subscribe({
      next: (respuesta) => {
        this.turno.set(null);
        this.eliminado.set(true);
        this.mensajeResultado.set(respuesta.mensaje);
      },
      error: (error) => {
        this.mensajeError.set(error.error?.mensaje ?? mensajeSinConexion);
      },
    });
  }

  private cargarTurno(): void {
    this.mensajeError.set('');

    this.turnoService.obtenerTurno(this.id).subscribe({
      next: (turno) => this.turno.set(turno),
      error: (error) => {
        this.turno.set(null);
        this.mensajeError.set(error.error?.mensaje ?? mensajeSinConexion);
      },
    });
  }
}