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

  it('should be return todo list', () => {
    const dateOfMockedTodo: Date = new Date();
    const mockListOfTodo: TodoModel[] = [
      { title: 'a', lastUpdate: dateOfMockedTodo, isClosed: false },
      { title: 'b', lastUpdate: dateOfMockedTodo, isClosed: false },
      { title: 'c', lastUpdate: dateOfMockedTodo, isClosed: true },
      { title: 'd', lastUpdate: dateOfMockedTodo, isClosed: true },
    ];

    service
      .getAllTodos()
      .pipe(first())
      .subscribe((res: TodoModel[]) => {
        expect(res).toEqual(mockListOfTodo);
      });

    const req = httpMock.expectOne(
      (r) => r.url === `${environment.baseApiUrl}/api/todos`
    );
    expect(req.request.method).toEqual('GET');

    req.flush(mockListOfTodo);
  });
});
