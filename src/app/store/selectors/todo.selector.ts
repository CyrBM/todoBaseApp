import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AppState, featureKey } from '../reducers/todo.reducers';
import { TodoModel } from '../../shared/models/todo.model';

export const selectAppState = createFeatureSelector<AppState>('appState');

export const selectTodosList = createSelector(
  selectAppState,
  (state: AppState) => state.todos
);

export const selectIsLoading = createSelector(
  selectAppState,
  (state: AppState) => state.isLoading
);
