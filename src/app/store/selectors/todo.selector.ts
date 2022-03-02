import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AppState, featureKey } from '../reducers/todo.reducers';
import { TodoModel } from '../../shared/models/todo.model';

export const selectAppState = createFeatureSelector<AppState>('appState');

export const selectTodosList = createSelector(
  selectAppState,
  (state: AppState) =>
    [...state.todos].sort((a, b) => {
      if (a.isClosed && b.isClosed) {
        return a.lastUpdate.valueOf() > b.lastUpdate.valueOf() ? 1 : -1;
      }
      if (a.isClosed && !b.isClosed) {
        return 1;
      }
      if (!a.isClosed && b.isClosed) {
        return -1;
      }
      if (!a.isClosed && !b.isClosed) {
        return a.lastUpdate.valueOf() > b.lastUpdate.valueOf() ? -1 : 1;
      }
      return 0;
    })
);

export const selectIsLoading = createSelector(
  selectAppState,
  (state: AppState) => state.isLoading
);

export const selectTodoFromId = (id: string) =>
  createSelector(selectTodosList, (todoList: TodoModel[]) =>
    todoList.find((x) => x.id === id)
  );
