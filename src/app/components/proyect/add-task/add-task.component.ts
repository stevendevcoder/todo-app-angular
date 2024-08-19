import { Component, Input, OnInit } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { Task } from '../../../models/Task';
import { SharedModule } from '../../../shared/shared.module';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-add-task',
  standalone: true,
  imports: [FormsModule, SharedModule, CommonModule],
  templateUrl: './add-task.component.html',
  styleUrl: './add-task.component.css',
})
export class AddTaskComponent implements OnInit {
  @Input() changeViewMode!: (type: string) => void;
  @Input() addTask!: (_task: Task, type: string) => void;
  @Input() editTask!: (_task: Task) => void;
  @Input() submitType!: string;
  @Input() taskToEdit!: Task;
  @Input() proyectId!: number;

  task: Task = {
    idTask: 0,
    title: '',
    description: '',
    lastUpdate: new Date(),
    star: false,
    done: false,
    proyectId: this.proyectId
  };

  ngOnInit() {
    console.log(this.submitType);
    if (this.submitType == 'edit') {
      this.task = { ...this.taskToEdit };
    }
  }

  onSubmit() {
    if (this.task.title != '') {
      this.task.lastUpdate = new Date();
      this.task.proyectId = this.proyectId;
      this.addTask(this.task, this.submitType);
    } else {
      this.changeViewMode('list');
    }
  }
}
