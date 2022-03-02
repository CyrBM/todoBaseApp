import { TodoModel } from '../../shared/models/todo.model';
import { Action, createReducer, on } from '@ngrx/store';
import {
  getTodosFailed,
  getTodosSuccess,
  loadSpinner,
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

export const appReducer = createReducer(
  initialState,
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
  // TODO to extract in another reducer for clean code
  on(loadSpinner, (state) => ({
    ...state,
    isLoading: true,
  }))
);
