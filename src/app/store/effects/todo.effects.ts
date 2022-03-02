import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { TodosService } from '../../shared/services/todos.service';
import {
  getTodos,
  getTodosFailed,
  getTodosSuccess,
  updateTodoState,
  updateTodoStateFailed,
  updateTodoStateSuccess,
} from '../actions/todo.actions';
import { catchError, map, mergeMap, switchMap } from 'rxjs';
import { TodoModel } from '../../shared/models/todo.model';

@Injectable()
export class TodoEffects {
  constructor(private $actions: Actions, private todosService: TodosService) {}

  getTodos$ = createEffect(() =>
    this.$actions.pipe(
      ofType(getTodos),
      mergeMap(() =>
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
}
