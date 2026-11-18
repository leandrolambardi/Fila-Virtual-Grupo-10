import { Routes } from '@angular/router';
import { MiTurno } from './components/mi-turno/mi-turno';
import { VerFila } from './components/ver-fila/ver-fila';
import { SacarTurno } from './components/sacar-turno/sacar-turno';
import { PanelAtencion } from './components/panel-atencion/panel-atencion';

export const routes: Routes = [
  { path: '', redirectTo: 'ver-fila', pathMatch: 'full' },
  { path: 'ver-fila', component: VerFila },
  { path: 'sacar-turno', component: SacarTurno },
  { path: 'atencion', component: PanelAtencion },
  { path: 'mi-turno/:id', component: MiTurno }
];