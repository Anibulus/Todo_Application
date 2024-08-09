import { CommonModule } from '@angular/common';
import { Component, OnDestroy, signal } from '@angular/core';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-labs',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './labs.component.html',
  styleUrl: './labs.component.css'
})
export class LabsComponent implements OnDestroy {
  title = 'my title';
  welcome = 'todo_app';

  name = 'Luis Preza';
  age = 25;
  disabled=true;
  image="https://w3schools.com/howto/img_avatar.png";

  person = signal({
    age : 25,
    name : 'Lugi Principe',
    avatar: 'https://w3schools.com/howto/img_avatar.png'
  });

  clickHandler()
  {
    alert('Hola');
  };

  changeHandler(event: Event)
  {
    console.log(event);
  };
  
  keydownHandler(event : KeyboardEvent)
  {
    const input = event.target as HTMLInputElement;
    console.log(input.value);
  };

  signalName = signal("Luis Antonio Signal");
  updateName(event: Event)
  {
    const input = event.target as HTMLInputElement;
    const newValue = input.value;
    this.signalName.set(newValue);
  }

  changeAgeHandler(event: Event)
  {
    const input = event.target as HTMLInputElement;
    const newValue = input.value;
    this.person.update(person => { 
      return {
        ...person, 
        age : parseInt(newValue) 
      } 
    } );
  };

  
  tasks = signal([
    'Instalar Angular CLI',
    'Crear proyecto',
    'Crear componentes'
  ]);


  //Suscripcion y dessuscripcion para evitar memory leaks.
  colorControl = new FormControl();

  sub: Subscription | null = null;

  ngOnDestroy(): void {
    if (this.sub !== null) {
      this.sub.unsubscribe();
    }
  }

  constructor ()
  {
    this.colorControl.valueChanges.subscribe(value=> console.log(value));
  }

  widthControl = new FormControl(100, {
    nonNullable: true,
    validators:[
      Validators.required
    ]
  });

  nameControl = new FormControl(50,{
    nonNullable:true,
    validators: 
    [
      Validators.required,
      Validators.minLength(5)
    ]
  });

}
