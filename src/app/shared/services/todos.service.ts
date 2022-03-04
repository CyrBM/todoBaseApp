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

  public updateTodoState(todo: TodoModel): Observable<TodoModel> {
    return this.httpClient.put<TodoModel>(
      `${environment.baseApiUrl}/todos/${todo.id}`,
      todo
    );
  }

  public getTodoById(idTodo: string): Observable<TodoModel> {
    return this.httpClient.get<TodoModel>(
      `${environment.baseApiUrl}/todos/${idTodo}`
    );
  }

  public addNewTodo(todo: TodoModel): Observable<TodoModel> {
    return this.httpClient.post<TodoModel>(
      `${environment.baseApiUrl}/todos`,
      todo
    );
  }
}
