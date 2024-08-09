import { CommonModule } from '@angular/common';
import { Component, signal } from '@angular/core';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { Task } from './../../models/task.model';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

  tasks = signal<Task[]>([
    {
      id : Date.now(),
      title : 'Instalar Angular CLI',
      completed : true
    },
    {
      id : Date.now(),
      title : 'Crear proyecto',
      completed : true
    },
    {
      id : Date.now(),
      title : 'Crear componentes',
      completed : true
    },
    {
      id : Date.now(),
      title : 'Completar funcionalidad',
      completed : false
    },
  ]);


  createTask(title: string): Task
  {
    const newTask = {
      id : Date.now(),
      title: title,
      completed: false
    };

    return newTask;
  }

  newTaskControl =new FormControl('', {
    nonNullable:true,
    validators: [
      Validators.required,
      Validators.pattern('^\\S.*$'),
      Validators.minLength(3),
    ]
  }); //Default value

  addTask(): void
  {
    if (!this.newTaskControl.valid)
    {
      alert("Complete task information before continue");
      return;
    }

    const value = this.newTaskControl.value.trim();
    const task = this.createTask(value);
    this.tasks.update( (tasks) => [...tasks, task]);
    this.newTaskControl.setValue('');
  }

  changeTaskStatus(index: number) : void
  {
    console.log("estoy cambiando el contenido")
    console.log(index)
    this.tasks.update( (tasks) =>
      tasks.map((task, i ) => 
        i === index ? { ...task, completed: !task.completed } : task 
      )
    );
    console.log(this.tasks())
  }


  deleteTask(index: number): void {
    this.tasks.update((tasks) => tasks.filter((task, position) => position !== index ));
  }

}
