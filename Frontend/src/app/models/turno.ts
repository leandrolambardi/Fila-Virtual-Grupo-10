export interface Turno {
  _id: string;
  numero: number;
  nombre: string;
  dni: string;
  curso: string;
  estado: 'en_espera' | 'retirado' | 'cancelado';
  fechaCreacion: string;
  fechaRetiro?: string;
  equipo?: string;
}