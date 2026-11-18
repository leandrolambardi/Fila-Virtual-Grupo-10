import { Component, OnInit, computed, signal } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { mensajeSinConexion } from '../../configuracion';
import { Turno } from '../../models/turno';
import { EstadoTextoPipe } from '../../pipes/estado-texto.pipe';
import { TurnoService } from '../../services/turno.service';

@Component({
  selector: 'app-ver-fila',
  imports: [ReactiveFormsModule, RouterLink, EstadoTextoPipe],
  templateUrl: './ver-fila.html',
  styleUrl: './ver-fila.css',
})
export class VerFila implements OnInit {
  protected readonly turnos = signal<Turno[]>([]);
  protected readonly cargando = signal(false);
  protected readonly mensajeError = signal('');
  protected readonly filtro = new FormControl('', { nonNullable: true });

  // Posición de cada turno en espera: 1 es el de menor número.
  protected readonly posiciones = computed(() => {
    const mapa = new Map<string, number>();
    const enEspera = this.turnos()
      .filter((turno) => turno.estado === 'en_espera')
      .sort((a, b) => a.numero - b.numero);
    enEspera.forEach((turno, indice) => mapa.set(turno._id, indice + 1));
    return mapa;
  });

  constructor(private turnoService: TurnoService) {}

  ngOnInit(): void {
    this.filtro.valueChanges.subscribe((estado) => this.cargar(estado));
    this.cargar();
  }

  protected cargar(estado: string = this.filtro.value): void {
    this.cargando.set(true);
    this.mensajeError.set('');

    this.turnoService.listarTurnos(estado === '' ? undefined : estado).subscribe({
      next: (turnos) => {
        this.turnos.set(turnos);
        this.cargando.set(false);
      },
      error: (error) => {
        this.turnos.set([]);
        this.cargando.set(false);
        this.mensajeError.set(error.error?.mensaje ?? mensajeSinConexion);
      },
    });
  }
}