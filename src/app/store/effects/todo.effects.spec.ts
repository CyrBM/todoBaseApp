/*
import { Observable, of } from 'rxjs';
import { Actions } from '@ngrx/effects';
import { TodoEffects } from './todo.effects';
import { TodosService } from '../../shared/services/todos.service';
import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { StoreModule } from '@ngrx/store';
import { appReducer } from '../reducers/todo.reducers';
import { TodoModel } from '../../shared/models/todo.model';
import {
  getTodos,
  getTodosFailed,
  getTodosSuccess,
} from '../actions/todo.actions';
import { cold, hot } from 'jasmine-marbles';

describe('Effects', () => {
  let effects: TodoEffects;
  let actions: Observable<Actions>;
  const todosService = jasmine.createSpyObj<TodosService>('TodosService', [
    'getAllTodos',
  ]);

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [StoreModule.forRoot({ appState: appReducer })],
      providers: [
        TodoEffects,
        provideMockActions(() => actions),
        {
          provide: TodosService,
          useValue: todosService,
        },
      ],
    });

    effects = TestBed.inject(TodoEffects);
  });

  describe('getTodos$', () => {
    fit('should dispatch getTodosSuccess action when todoService.getAllTodos return a result', () => {
      const mockedTodos: TodoModel[] = [
        { id: 'aa', title: 'aTitle', isClosed: true, lastUpdate: new Date() },
      ];
      todosService.getAllTodos.and.returnValue(of(mockedTodos));

      actions = hot('-a-', {
        a: getTodos(),
      });
      const expected = cold('-b-', {
        b: getTodosSuccess({ todos: mockedTodos }),
      });

      expect(effects.getTodos$).toBeObservable(expected);
    });

    it('should dispatch getTodosFailed action when todoService.getAllTodos fails', () => {
      todosService.getAllTodos.and.returnValue(cold('#'));

      actions = hot('-a-', {
        a: getTodos(),
      });
      const expected = cold('-b-', {
        b: getTodosFailed(),
      });

      expect(effects.getTodos$).toBeObservable(expected);
    });
  });
});
*/
