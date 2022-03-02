import { createAction, props } from '@ngrx/store';
import { TodoModel } from '../../shared/models/todo.model';

export const getTodos = createAction('[TODO] get all Todos');
export const getTodosSuccess = createAction(
  '[TODO] get all Todos success',
  props<{ todos: TodoModel[] }>()
);
export const getTodosFailed = createAction('[TODO] get all Todos FAIL');

export const updateTodoState = createAction(
  '[TODO] update TODO state',
  props<{ todo: TodoModel }>()
);
export const updateTodoStateSuccess = createAction(
  '[TODO] update TODO state success',
  props<{ todo: TodoModel }>()
);
export const updateTodoStateFailed = createAction(
  '[TODO] update TODO state FAIL',
  props<{ todo: TodoModel }>()
);

export const loadSpinner = createAction('[SPINNER] LOAD');
