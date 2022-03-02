import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { TodosService } from '../../shared/services/todos.service';
import {
  getTodos,
  getTodosFailed,
  getTodosSuccess,
} from '../actions/todo.actions';
import { catchError, map, mergeMap } from 'rxjs';

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
}
