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
  addNewTodo,
  addNewTodoFailed,
  addNewTodoSuccess,
  getDetailTodo,
  getDetailTodoFailed,
  getDetailTodoSuccess,
  getTodos,
  getTodosFailed,
  getTodosSuccess,
  updateTodoState,
  updateTodoStateFailed,
  updateTodoStateSuccess,
} from '../actions/todo.actions';
import { cold, hot } from 'jasmine-marbles';

describe('Effects', () => {
  let effects: TodoEffects;
  let actions: Observable<Actions>;
  const mockedTodo: TodoModel = {
    id: 't1.45',
    title: 'AAA',
    isClosed: false,
    lastUpdate: new Date(),
  };

  const todosService = jasmine.createSpyObj<TodosService>('TodosService', [
    'getAllTodos',
    'updateTodoState',
    'addNewTodo',
    'getTodoById',
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
    it('should dispatch getTodosSuccess action when todoService.getAllTodos return a result', () => {
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

  describe(' updateTodoState$', () => {
    it('should dispatch success on update state', () => {
      todosService.updateTodoState.and.returnValue(of(mockedTodo));
      actions = hot('-a-', {
        a: updateTodoState({ todo: mockedTodo }),
      });

      const expected = cold('-a-', {
        a: updateTodoStateSuccess({
          todo: mockedTodo,
        }),
      });

      expect(effects.updateStateTodo$).toBeObservable(expected);
    });

    it('should dispatch faile on update state', () => {
      todosService.updateTodoState.and.returnValue(cold('#'));
      actions = hot('-a-', {
        a: updateTodoState({ todo: mockedTodo }),
      });

      const expected = cold('-a-', {
        a: updateTodoStateFailed({
          todo: {
            ...mockedTodo,
            lastUpdate: new Date(),
          },
        }),
      });

      expect(effects.updateStateTodo$).toBeObservable(expected);
    });
  });
  describe(' addNewTodo$$', () => {
    it('should add new todo success', () => {
      todosService.addNewTodo.and.returnValue(of(mockedTodo));

      actions = hot('-a-', {
        a: addNewTodo({ todo: mockedTodo }),
      });
      const expected = cold('-a-', {
        a: addNewTodoSuccess({ todo: mockedTodo }),
      });

      expect(effects.addNewTodo$).toBeObservable(expected);
    });
    it('should add new todo failed', () => {
      todosService.addNewTodo.and.returnValue(cold('#'));

      actions = hot('-a-', {
        a: addNewTodo({ todo: mockedTodo }),
      });
      const expected = cold('-a-', {
        a: addNewTodoFailed(),
      });
      expect(effects.addNewTodo$).toBeObservable(expected);
    });
  });
  describe('getOneTodo$', () => {
    it('shoud get one todo success', () => {
      todosService.getTodoById.and.returnValue(of(mockedTodo));

      actions = hot('-a-', {
        a: getDetailTodo({ idTodo: mockedTodo.id }),
      });

      const expected = cold('-a-', {
        a: getDetailTodoSuccess({ todo: mockedTodo }),
      });
      expect(effects.getOneTodo$).toBeObservable(expected);
    });
    it('shoud get one todo failed', () => {
      todosService.getTodoById.and.returnValue(cold('#'));

      actions = hot('-a-', {
        a: getDetailTodo({ idTodo: mockedTodo.id }),
      });

      const expected = cold('-a-', {
        a: getDetailTodoFailed(),
      });
      expect(effects.getOneTodo$).toBeObservable(expected);
    });
  });
});
