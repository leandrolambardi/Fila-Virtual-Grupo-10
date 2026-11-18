export type EstadoTurno =
  | 'en_espera'
  | 'retirado'
  | 'cancelado';

export interface Turno {
  _id: string;
  numero: number;
  nombre: string;
  dni: string;
  curso: string;
  estado: EstadoTurno;
  equipo?: string;
  createdAt?: string;
}