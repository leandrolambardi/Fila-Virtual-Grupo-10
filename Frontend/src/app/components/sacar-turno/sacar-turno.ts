import { Component, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { mensajeSinConexion } from '../../configuracion';
import { TurnoService } from '../../services/turno.service';

@Component({
  selector: 'app-sacar-turno',
  imports: [ReactiveFormsModule],
  templateUrl: './sacar-turno.html',
  styleUrl: './sacar-turno.css',
})
export class SacarTurno {
  protected readonly mensajeCampos = 'Completá nombre, DNI y curso.';
  protected readonly mensajeDni = 'El DNI debe tener 7 u 8 dígitos, sin puntos ni espacios.';

  protected readonly formulario = new FormGroup({
    nombre: new FormControl('', { nonNullable: true, validators: [Validators.required] }),
    dni: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required, Validators.pattern(/^\d{7,8}$/)],
    }),
    curso: new FormControl('', { nonNullable: true, validators: [Validators.required] }),
  });

  protected readonly enviando = signal(false);
  protected readonly mensajeError = signal('');

  constructor(
    private turnoService: TurnoService,
    private router: Router
  ) {}

  protected enviar(): void {
    this.mensajeError.set('');

    if (this.formulario.invalid) {
      this.formulario.markAllAsTouched();
      this.mensajeError.set(
        this.formulario.controls.dni.hasError('pattern') ? this.mensajeDni : this.mensajeCampos
      );
      return;
    }

    this.enviando.set(true);
    const { nombre, dni, curso } = this.formulario.getRawValue();

    this.turnoService.crearTurno({ nombre, dni, curso }).subscribe({
      next: (turno) => {
        this.router.navigate(['/mi-turno', turno._id]);
      },
      error: (error) => {
        this.enviando.set(false);
        this.mensajeError.set(error.error?.mensaje ?? mensajeSinConexion);
      },
    });
  }
}