import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'my title';
  welcome = 'todo_app';
    tasks = [
      'Instalar Angular CLI',
      'Crear proyecto',
      'Crear componentes'
    ]
    name = 'Luis Preza';
    age = 25;
    disabled=true;
}
