import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Task } from '../models/Task';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  private apiURL = 'http://localhost:5135/api/Tasks';

  constructor(private http: HttpClient) {}

  getTasks(): Observable<Task[]> {
    return this.http.get<Task[]>(this.apiURL);
  }

  getTask(id: number): Observable<Task> {
    return this.http.get<Task>(`${this.apiURL}/${id}`);
  }

  addTask(task: Task): Observable<Task> {
    return this.http.post<Task>(this.apiURL, task);
  }

  updateTask(id: number, task: Task): Observable<any> {
    return this.http.put(`${this.apiURL}/${id}`, task);
  }

  deleteTask(id: number): Observable<any> {
    return this.http.delete(`${this.apiURL}/${id}`);
  }
}
