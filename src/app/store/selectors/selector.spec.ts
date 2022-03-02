import { AppState } from '../reducers/todo.reducers';
import * as todoSelector from './todo.selector';
import { selectTodosList } from './todo.selector';

describe('Selectors', () => {
  const initialState: AppState = {
    todos: [
      { title: 'todo1Title', isClosed: true },
      { title: 'todo2Title', isClosed: false },
    ],
    isLoading: false,
  };

  it('should select todos list', () => {
    const result = todoSelector.selectTodosList.projector(initialState);
    expect(result).toEqual(initialState.todos);
  });

  it('should select loading boolean', () => {
    const result = todoSelector.selectIsLoading.projector(initialState);
    expect(result).toEqual(initialState.isLoading);
  });

  it('should select AppState', () => {
    const result = todoSelector.selectAppState.projector(initialState);
    expect(result).toEqual(initialState);
  });
});
