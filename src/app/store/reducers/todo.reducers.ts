import { TodoModel } from '../../shared/models/todo.model';
import { createReducer, on } from '@ngrx/store';
import {
  getDetailTodo,
  getDetailTodoFailed,
  getDetailTodoSuccess,
  getTodos,
  getTodosFailed,
  getTodosSuccess,
  loadSpinner,
  updateTodoState,
  updateTodoStateFailed,
  updateTodoStateSuccess,
} from '../actions/todo.actions';

export const featureKey = 'todos';

export interface AppState {
  todos: TodoModel[];
  isLoading: boolean;
}

export const initialState: AppState = {
  todos: [],
  isLoading: false,
};

function getTodosListUpdated(state: AppState, todo: TodoModel): TodoModel[] {
  return state.todos.map((todoStore: TodoModel) => {
    if (todo.id === todoStore.id) {
      return {
        ...todoStore,
        isClosed: todo.isClosed,
        lastUpdate: todo.lastUpdate,
      };
    }
    return todoStore;
  });
}

export const appReducer = createReducer(
  initialState,
  on(getTodos, (state) => ({
    ...state,
    isLoading: true,
  })),
  on(getTodosSuccess, (state, { todos }) => ({
    ...state,
    todos,
    isLoading: false,
  })),
  on(getTodosFailed, (state) => ({
    ...state,
    todos: [],
    isLoading: false,
  })),
  on(updateTodoState, (state, { todo }) => ({
    ...state,
    isLoading: true,
  })),
  on(updateTodoStateSuccess, (state, { todo }) => ({
    ...state,
    isLoading: false,
    todos: getTodosListUpdated(state, todo),
  })),
  on(updateTodoStateFailed, (state, { todo }) => ({
    ...state,
    todos: getTodosListUpdated(state, todo),
    isLoading: false,
  })),
  on(getDetailTodo, (state, { idTodo }) => ({
    ...state,
    isLoading: true,
  })),
  on(getDetailTodoSuccess, (state, { todo }) => ({
    ...state,
    isLoading: false,
    todos: [todo],
  })),
  on(getDetailTodoFailed, (state) => ({
    ...state,
    isLoading: false,
    todos: [],
  }))
);
