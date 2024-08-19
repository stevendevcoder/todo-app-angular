import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';
import { Task } from '../../models/Task';

@Component({
  selector: 'task',
  standalone: true,
  imports: [CommonModule, SharedModule],
  templateUrl: './task.component.html',
  styleUrl: './task.component.css',
})
export class TaskComponent implements OnInit {
  @Input() task!: Task;
  @Input() deleteTask!: (id: number) => void;
  @Input() editTask!: (_task: Task) => void;
  @Input() doneTask!: (id: number) => void;
  taskView!: Task;

  ngOnInit() {
    this.taskView = {...this.task};
  }

  checkTask = () => {
    this.taskView.done = !this.taskView.done;
    console.log("interno: ",this.taskView);
    this.doneTask(this.taskView.idTask);
  };
}
