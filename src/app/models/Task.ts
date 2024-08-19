export class Task {
  idTask: number = -1;
  title: String = '';
  description: String = '';
  lastUpdate: Date = new Date();
  star: Boolean = false;
  done: Boolean = false;
  proyectId: number = 0;

  constructor() {}
}
