import { Pipe, PipeTransform } from '@angular/core';
import { EstadoTurno } from '../models/turno';

@Pipe({
  name: 'estadoTexto',
  standalone: true
})
export class EstadoTextoPipe implements PipeTransform {

  transform(estado: EstadoTurno): string {
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