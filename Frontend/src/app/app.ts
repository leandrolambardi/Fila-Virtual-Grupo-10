import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Navegacion } from './components/navegacion/navegacion';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Navegacion],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {}