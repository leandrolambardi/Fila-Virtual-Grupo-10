import { Routes } from '@angular/router';
import { MiTurno } from './components/mi-turno/mi-turno';
import { VerFila } from './components/ver-fila/ver-fila';

export const routes: Routes = [
  { path: '', redirectTo: 'ver-fila', pathMatch: 'full' },
  { path: 'ver-fila', component: VerFila },
  { path: 'mi-turno/:id', component: MiTurno }
];