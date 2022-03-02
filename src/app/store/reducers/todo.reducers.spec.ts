import * as todoRecuder from './todo.reducers';
import { AppState } from './todo.reducers';
import {
  getTodosFailed,
  getTodosSuccess,
  loadSpinner,
} from '../actions/todo.actions';

describe('TODO Reducer', () => {
  describe('unknown action', () => {
    it('should return the default state', () => {
      const initialState: AppState = todoRecuder.initialState;
      const action = {
        type: 'Unknown',
      };
      const state = todoRecuder.appReducer(initialState, action);

      expect(state).toBe(initialState);
    });
  });

  describe('get Todos success action', () => {
    it('should retrieve all todos and update the state', () => {
      const initialState: AppState = todoRecuder.initialState;
      const newState: AppState = {
        todos: [{ title: 'aTitle', isClosed: false }],
        isLoading: false,
      };
      const action = getTodosSuccess({
        todos: [...newState.todos],
      });

      const state = todoRecuder.appReducer(initialState, action);

      expect(state).toEqual(newState);
      expect(state).not.toBe(newState);
    });
  });

  describe('GetTodos Failed action', () => {
    it('should retrieve  initialState: just an aempty array because fail', () => {
      const initialState: AppState = todoRecuder.initialState;

      const action = getTodosFailed();

      const state = todoRecuder.appReducer(initialState, action);

      expect(state).toEqual(initialState);
      expect(state).not.toBe(initialState);
    });
  });

  describe('Test Spinner Events', () => {
    it('should retrieve  initialState: just an aempty array because fail', () => {
      const initialState: AppState = todoRecuder.initialState;

      const spinnerState: AppState = {
        todos: [],
        isLoading: true,
      };
      const action = loadSpinner();

      const state = todoRecuder.appReducer(initialState, action);

      expect(state).toEqual(spinnerState);
      expect(state).not.toBe(spinnerState);
    });
  });
});
