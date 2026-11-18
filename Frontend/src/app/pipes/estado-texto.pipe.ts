import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'estadoTexto' })
export class EstadoTextoPipe implements PipeTransform {
  transform(estado: string): string {
    switch (estado) {
      case 'en_espera':
        return 'En espera';
      case 'retirado':
        return 'Retirado';
      case 'cancelado':
        return 'Cancelado';
      default:
        return estado;
    }
  }
}