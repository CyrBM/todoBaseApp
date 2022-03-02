import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { TodoModel } from '../models/todo.model';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class TodosService {
  constructor(private httpClient: HttpClient) {}

  public getAllTodos(): Observable<TodoModel[]> {
    return this.httpClient.get<TodoModel[]>(`${environment.baseApiUrl}/todos`);
  }
}