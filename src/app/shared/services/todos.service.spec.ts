import { TestBed } from '@angular/core/testing';

import { TodosService } from './todos.service';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { TodoModel } from '../models/todo.model';
import { first } from 'rxjs';
import { environment } from '../../../environments/environment';

describe('TodosService', () => {
  let service: TodosService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({ imports: [HttpClientTestingModule] });
    service = TestBed.inject(TodosService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should be return todo list', (done) => {
    const dateOfMockedTodo: Date = new Date();
    const mockListOfTodo: TodoModel[] = [
      { id: 'aa', title: 'a', lastUpdate: dateOfMockedTodo, isClosed: false },
      { id: 'bb', title: 'b', lastUpdate: dateOfMockedTodo, isClosed: false },
      { id: 'cc', title: 'c', lastUpdate: dateOfMockedTodo, isClosed: true },
      { id: 'dd', title: 'd', lastUpdate: dateOfMockedTodo, isClosed: true },
    ];

    service
      .getAllTodos()
      .pipe(first())
      .subscribe({
        next: (res: TodoModel[]) => {
          expect(res).toEqual(mockListOfTodo);
          done();
        },
        error: done.fail,
      });

    const req = httpMock.expectOne((r) => r.url === `/api/todos`);
    expect(req.request.method).toEqual('GET');

    req.flush(mockListOfTodo);
  });

  it('should update todo and return it', (done) => {
    const dateOfMockedTodo: Date = new Date();
    const todoToUpdate: TodoModel = {
      id: 'aa',
      title: 'a',
      lastUpdate: dateOfMockedTodo,
      isClosed: false,
    };

    service
      .updateTodoState(todoToUpdate)
      .pipe(first())
      .subscribe({
        next: (res: TodoModel) => {
          expect(res).toEqual(todoToUpdate);
          done();
        },
        error: done.fail,
      });

    const req = httpMock.expectOne((r) => r.url === `/api/todos/aa`);
    expect(req.request.method).toEqual('PUT');

    req.flush(todoToUpdate);
  });

  it('should find and return todo by id', () => {
    const dateOfMockedTodo: Date = new Date();
    const todoToReturn: TodoModel = {
      id: 'aa',
      title: 'a',
      lastUpdate: dateOfMockedTodo,
      isClosed: false,
    };

    service
      .getTodoById(todoToReturn.id)
      .pipe(first())
      .subscribe((res: TodoModel) => {
        expect(res).toEqual(todoToReturn);
      });

    const req = httpMock.expectOne((r) => r.url === `/api/todos/aa`);
    expect(req.request.method).toEqual('GET');

    req.flush(todoToReturn);
  });

  it('should add new todo', () => {
    const dateOfMockedTodo: Date = new Date();
    const todoToReturn: TodoModel = {
      id: 'aa',
      title: 'a',
      lastUpdate: dateOfMockedTodo,
      isClosed: false,
    };

    service
      .addNewTodo(todoToReturn)
      .pipe(first())
      .subscribe((res: TodoModel) => {
        expect(res).toEqual(todoToReturn);
      });

    const req = httpMock.expectOne((r) => r.url === `/api/todos`);
    expect(req.request.method).toEqual('POST');

    req.flush(todoToReturn);
  });
});
