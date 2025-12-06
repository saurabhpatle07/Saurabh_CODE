import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Mascot } from './mascot/mascot';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Mascot],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected title = 'learning-app';
}
