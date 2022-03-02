import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { TodosService } from '../../shared/services/todos.service';
import {
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
import { catchError, map, mergeMap, switchMap, concatMap, tap } from 'rxjs';
import { TodoModel } from '../../shared/models/todo.model';

@Injectable()
export class TodoEffects {
  constructor(private $actions: Actions, private todosService: TodosService) {}

  getTodos$ = createEffect(() =>
    this.$actions.pipe(
      ofType(getTodos),
      concatMap(() =>
        this.todosService.getAllTodos().pipe(
          map((todos) => getTodosSuccess({ todos })),
          catchError(() => [getTodosFailed()])
        )
      )
    )
  );

  updateStateTodo$ = createEffect(() =>
    this.$actions.pipe(
      ofType(updateTodoState),
      map(({ todo: todoMap }) => ({
        ...todoMap,
        isClosed: !todoMap.isClosed,
        lastUpdate: new Date(),
      })),
      switchMap((todo: TodoModel) =>
        this.todosService.updateTodoState(todo).pipe(
          map((todo) => updateTodoStateSuccess({ todo })),
          catchError(() => {
            const todoRollBack = {
              ...todo,
              isClosed: !todo.isClosed,
            };
            return [updateTodoStateFailed({ todo: todoRollBack })];
          })
        )
      )
    )
  );

  getOneTodo$ = createEffect(() =>
    this.$actions.pipe(
      ofType(getDetailTodo),
      switchMap(({ idTodo }) =>
        this.todosService.getTodoById(idTodo).pipe(
          map((todo) => getDetailTodoSuccess({ todo })),
          catchError(() => [getDetailTodoFailed()])
        )
      )
    )
  );
}
