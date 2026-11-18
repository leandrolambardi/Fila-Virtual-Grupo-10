import { Routes } from '@angular/router';
import { VerFila } from './components/ver-fila/ver-fila';

export const routes: Routes = [
  { path: '', redirectTo: 'ver-fila', pathMatch: 'full' },
  { path: 'ver-fila', component: VerFila }
];