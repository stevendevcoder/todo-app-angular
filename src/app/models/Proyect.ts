import { Task } from './Task';

export class Proyect {
  idProyect: number = 0;
  name: string = '';
  description: string = '';
  iconName: string = '';
  color: string = '';
  lastUpdate: Date = new Date();
  tasksList: Task[] = [];

  constructor() {}
}
