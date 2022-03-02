import { TestBed } from '@angular/core/testing';

import { TodoGuard } from './todo.guard';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { AppState } from '../../store/reducers/todo.reducers';
import { RouterTestingModule } from '@angular/router/testing';
import {
  selectTodoFromId,
  selectTodosList,
} from '../../store/selectors/todo.selector';

describe('TodoGuard', () => {
  let guard: TodoGuard;
  let store: MockStore<AppState>;
  let mockTodoSelector;

  const mockedTodo = {
    id: 'aa',
    title: 'a',
    isClosed: false,
    lastUpdate: new Date(),
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule.withRoutes([])],
      providers: [provideMockStore()],
    });
  });

  beforeEach(() => {
    TestBed.configureTestingModule({});
    store = TestBed.inject(MockStore);
    guard = TestBed.inject(TodoGuard);
    mockTodoSelector = store.overrideSelector(
      selectTodoFromId(mockedTodo.id),
      mockedTodo
    );
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });

  it('should be ok', () => {});
});
