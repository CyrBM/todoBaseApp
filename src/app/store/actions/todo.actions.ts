import { createAction, props } from '@ngrx/store';
import { TodoModel } from '../../shared/models/todo.model';

export const getTodos = createAction('[TODO] get all Todos');
export const getTodosSuccess = createAction(
  '[TODO] get all Todos success',
  props<{ todos: TodoModel[] }>()
);

export const loadSpinner = createAction('[SPINNER] LOAD');
export const getTodosFailed = createAction('[TODO] get all Todos FAIL');
