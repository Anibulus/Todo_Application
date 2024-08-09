import { CommonModule } from '@angular/common';
import { Component, computed, effect, inject, Injector, signal } from '@angular/core';
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

  tasks = signal<Task[]>([]);

  tasksByFilter = computed(() => {
    const filter = this.filter();
    const tasks = this.tasks();
    if(filter == 'pending')
      return tasks.filter(task => !task.completed)
    if(filter == 'completed')
      return tasks.filter(task => task.completed)
    return tasks

  });

  filter = signal<'all'|'pending'|'completed'>('all');

  changeFilter(filter: 'all'|'pending'|'completed'): void
  {
    this.filter.set(filter);
  }

  createTask(title: string): Task
  {
    const newTask = {
      id : Date.now(),
      title: title,
      completed: false
    };

    return newTask;
  }

  editingMode(index:number):void
  {
    this.tasks.update( (tasks) =>
      tasks.map((task, i ) => 
        i === index ? { ...task, editing: true } : { ...task, editing:false }
      )
    );
  }

  newTaskControl =new FormControl('', {//Default value
    nonNullable:true,
    validators: [
      Validators.required,
      Validators.pattern('^\\S.*$'),
      Validators.minLength(3),
    ]
  }); 

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
    this.tasks.update( (tasks) =>
      tasks.map((task, i ) => 
        i === index ? { ...task, completed: !task.completed } : task 
      )
    );
    console.log(this.tasks())
  }

  updateTaskTitle(index: number, event : Event): void
  {
    const input = event.target as HTMLInputElement;
    const title = input.value;

    this.tasks.update( (tasks) =>
      tasks.map((task, i ) => 
        i === index ? { ...task, title: title, editing: false } : task 
      )
    );
    console.log(this.tasks())
  }


  deleteTask(index: number): void {
    this.tasks.update((tasks) => tasks.filter((task, position) => position !== index ));
  }


  injector = inject(Injector);

  ngOnInit()
  {
    const tasksStringfy = localStorage.getItem('tasks');
    if(tasksStringfy === null)
      return;

    const tasks = JSON.parse(tasksStringfy);
    this.tasks.set(tasks);

    this.trackTasks();
  }

  trackTasks()
  {
    effect(() => {
      const tasks = this.tasks();
      localStorage.setItem('tasks', JSON.stringify(tasks))
    }, { injector: this.injector });
  }
}
