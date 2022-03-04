import { TestBed } from '@angular/core/testing';

import { TodoGuard } from './todo.guard';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { AppState } from '../../store/reducers/todo.reducers';
import { RouterTestingModule } from '@angular/router/testing';
import {
  selectIsLoading,
  selectTodoFromId,
  selectTodosList,
} from '../../store/selectors/todo.selector';
import {
  ActivatedRoute,
  ActivatedRouteSnapshot,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { catchError, first, of } from 'rxjs';

describe('TodoGuard', () => {
  let guard: TodoGuard;
  let store: MockStore<AppState>;

  const mockedTodo = {
    id: 'aa',
    title: 'a',
    isClosed: false,
    lastUpdate: new Date(),
  };
  const routeSnapMock = new ActivatedRouteSnapshot();
  let routeStateMock: any = { snapshot: {}, url: '/cookies' };
  let routerMock = jasmine.createSpyObj<Router>('stateRouter', ['parseUrl']);

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule.withRoutes([])],
      providers: [
        { provide: Router, useValue: routerMock },
        provideMockStore({
          selectors: [
            { selector: selectTodosList, value: [mockedTodo] },
            { selector: selectIsLoading, value: false },
          ],
        }),
      ],
    });
  });

  beforeEach(() => {
    TestBed.configureTestingModule({});
    store = TestBed.inject(MockStore);
    guard = TestBed.inject(TodoGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });

  it('should be ok', (done) => {
    routeSnapMock.params = {
      id: mockedTodo.id,
    };
    guard
      .canActivate(routeSnapMock, routeStateMock)
      .pipe(first())
      .subscribe({
        next: (data) => {
          expect(data).toBeTrue();
          done();
        },
        error: done.fail,
      });
  });
  it('should not be ok because id didnt exist', (done) => {
    routeSnapMock.params = {
      id: 'NO',
    };
    guard
      .canActivate(routeSnapMock, routeStateMock)
      .pipe(first())
      .subscribe({
        next: (data) => {
          expect(routerMock.parseUrl).toHaveBeenCalledWith('/');
          done();
        },
        error: done.fail,
      });
  });
});
