import { Component, Input, OnInit } from '@angular/core';
import { Proyect } from '../../models/Proyect';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../shared/shared.module';
import { TaskComponent } from '../task/task.component';
import { Task } from '../../models/Task';
import { AddTaskComponent } from './add-task/add-task.component';
import {
  CdkDragDrop,
  CdkDropList,
  CdkDrag,
  moveItemInArray,
} from '@angular/cdk/drag-drop';
import { TaskService } from '../../services/tasks.service';

@Component({
  selector: 'proyect-list',
  standalone: true,
  imports: [
    CommonModule,
    SharedModule,
    TaskComponent,
    AddTaskComponent,
    CdkDropList,
    CdkDrag,
  ],
  templateUrl: './proyect.component.html',
  styleUrl: './proyect.component.css',
})
export class ProyectComponent implements OnInit {
  @Input() proyect!: Proyect;
  @Input() updateTasksList!: (newTasksList: Task[]) => void;

  taskToEdit: Task = new Task();
  viewMode: string = 'list';

  constructor(private taskService: TaskService){

  }

  drop(event: CdkDragDrop<Task[]>) {
    moveItemInArray(
      this.proyect.tasksList,
      event.previousIndex,
      event.currentIndex
    );
  }

  ngOnInit() {
    console.log(this.proyect);
  }

  editTask = (_task: Task): void => {
    this.taskToEdit = _task;
    this.changeViewMode('edit');
  };

  doneTask = (id: number): void => {
    if (!this.proyect || !this.proyect.tasksList) {
      console.error('proyect o tasksList no está definido');
      return;
    }

    let index = this.proyect.tasksList.findIndex((t) => id === t.idTask);

    if (index === -1) {
      console.error(`No se encontró una tarea con id ${id}`);
      return;
    }

    this.proyect.tasksList[index].done = !(this.proyect.tasksList[index].done);

    console.log('Checkeando tarea: ', this.proyect.tasksList[index]);
  };

  deleteTask = (id: number): void => {
    this.proyect.tasksList = this.proyect.tasksList.filter(
      (t) => t.idTask != id
    );
    this.changeViewMode('list');
  };

  addTask = (_task: Task, type: string): void => {
    _task.proyectId = this.proyect.idProyect;

    if (type === 'add') { //Añadir
      /*
      let tasksSize = this.proyect.tasksList.length;
      let countID: number =
        tasksSize > 0 ? this.proyect.tasksList[0].idTask : -1;
      _task.idTask = countID + 1;*/

      this.taskService.addTask(_task).subscribe(
        response => {
          this.proyect.tasksList.unshift(_task);
          console.log('Tarea subida exitosamente', response);
        },
        error => console.log('Error al subir tarea: ', error.error)
      );

    } else { //Editar
      let index = this.proyect.tasksList.findIndex(
        (t) => _task.idTask == t.idTask
      );
      this.proyect.tasksList[index] = _task;
    }
    this.changeViewMode('list');
    this.taskToEdit = new Task();
    console.log('Me ejecuto');
  };

  changeViewMode = (type: string): void => {
    if (type === 'list edit') {
      this.taskToEdit = new Task();
      this.viewMode = 'list';
    } else {
      this.viewMode = type;
    }
    console.log('cambiamos a ', type);
  };
}
