import { AppState } from '../reducers/todo.reducers';
import * as todoSelector from './todo.selector';
import { selectTodosList } from './todo.selector';

describe('Selectors', () => {
  const initialState: AppState = {
    todos: [
      {
        id: 'bb',
        title: 'todo2Title',
        isClosed: false,
        lastUpdate: new Date(),
      },
      { id: 'aa', title: 'todo1Title', isClosed: true, lastUpdate: new Date() },
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

  it('should select todos list and filter list', () => {
    const dateTemp: Date = new Date();
    const baseAppState: AppState = {
      todos: [
        {
          id: 'bb',
          title: 'todo2Title',
          isClosed: true,
          lastUpdate: new Date(2000, 11, 1),
        },
        {
          id: 'cc',
          title: 'todoCTitle',
          isClosed: true,
          lastUpdate: new Date(2001, 11, 1),
        },
        {
          id: 'aa',
          title: 'todo1Title',
          isClosed: false,
          lastUpdate: new Date(2002, 11, 1),
        },
        {
          id: 'xx',
          title: 'todoXTitle',
          isClosed: true,
          lastUpdate: new Date(2003, 11, 1),
        },
        {
          id: 'zz',
          title: 'todoZTitle',
          isClosed: false,
          lastUpdate: new Date(2004, 11, 1),
        },
      ],
      isLoading: false,
    };

    const filterAppState: AppState = {
      todos: [
        {
          id: 'zz',
          title: 'todoZTitle',
          isClosed: false,
          lastUpdate: new Date(2004, 11, 1),
        },
        {
          id: 'aa',
          title: 'todo1Title',
          isClosed: false,
          lastUpdate: new Date(2002, 11, 1),
        },
        {
          id: 'bb',
          title: 'todo2Title',
          isClosed: true,
          lastUpdate: new Date(2000, 11, 1),
        },
        {
          id: 'cc',
          title: 'todoCTitle',
          isClosed: true,
          lastUpdate: new Date(2001, 11, 1),
        },
        {
          id: 'xx',
          title: 'todoXTitle',
          isClosed: true,
          lastUpdate: new Date(2003, 11, 1),
        },
      ],
      isLoading: false,
    };
    const result = todoSelector.selectTodosList.projector(baseAppState);
    expect(result).toEqual(filterAppState.todos);
  });
});
