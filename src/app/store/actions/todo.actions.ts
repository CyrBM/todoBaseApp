import { createAction, props } from '@ngrx/store';
import { TodoModel } from '../../shared/models/todo.model';

export const getTodos = createAction('[TODO] get all Todos');
export const getTodosSuccess = createAction(
  '[TODOS] get all Todos success',
  props<{ todos: TodoModel[] }>()
);
export const getTodosFailed = createAction('[TODOS] get all Todos FAIL');

export const updateTodoState = createAction(
  '[TODOS] update TODO state',
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

export const getDetailTodo = createAction(
  '[TODO] get one todo for detail',
  props<{ idTodo: string }>()
);

export const getDetailTodoSuccess = createAction(
  '[TODO] get one todo for detail success',
  props<{ todo: TodoModel }>()
);
export const getDetailTodoFailed = createAction(
  '[TODO] get one todo for detail FAIL'
);

export const addNewTodo = createAction(
  '[TODO] add new TODO',
  props<{ todo: TodoModel }>()
);

export const addNewTodoSuccess = createAction(
  '[TODO] add new TODO success',
  props<{ todo: TodoModel }>()
);

export const addNewTodoFailed = createAction('[TODO] add new TODO FAIL');
