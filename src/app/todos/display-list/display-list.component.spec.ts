import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DisplayListComponent } from './display-list.component';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { AppState } from '../../store/reducers/todo.reducers';
import { SharedModule } from '../../shared/shared.module';
import { By } from '@angular/platform-browser';
import { selectTodosList } from '../../store/selectors/todo.selector';
import { TodoModel } from '../../shared/models/todo.model';

describe('DisplayListComponent', () => {
  let component: DisplayListComponent;
  let fixture: ComponentFixture<DisplayListComponent>;
  let store: MockStore<AppState>;
  let mockTodosSelector;

  const mockedDate: Date = new Date();
  const mockedTodo: TodoModel[] = [
    { id: 'aa', title: 'a', isClosed: false, lastUpdate: mockedDate },
    { id: 'bb', title: 'b', isClosed: true, lastUpdate: mockedDate },
  ];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SharedModule],
      declarations: [DisplayListComponent],
      providers: [provideMockStore()],
    }).compileComponents();
  });

  beforeEach(() => {
    store = TestBed.inject(MockStore);
    fixture = TestBed.createComponent(DisplayListComponent);
    component = fixture.componentInstance;

    mockTodosSelector = store.overrideSelector(selectTodosList, mockedTodo);

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display Todos as title', () => {
    expect(
      fixture.debugElement.query(By.css('h2')).nativeElement.innerText
    ).toEqual('Todos :');
  });

  it('should display 2 todos', () => {
    const todoElements = fixture.debugElement.queryAll(By.css('mat-card'));
    const contentOfFirstMatCard = todoElements[0]
      .query(By.css('mat-card-content'))
      .queryAll(By.css('p'));

    const contentOfSecondMatCard = todoElements[1]
      .query(By.css('mat-card-content'))
      .queryAll(By.css('p'));

    expect(todoElements.length).toEqual(2);

    expect(
      todoElements[0].query(By.css('mat-card-title')).nativeElement.innerText
    ).toContain('a');
    expect(
      todoElements[0].query(By.css('mat-card-title span')).nativeElement
        .className
    ).not.toContain('crossed-out');
    expect(contentOfFirstMatCard[0].nativeElement.innerText).toContain(
      'Task is in progress'
    );

    expect(
      todoElements[1].query(By.css('mat-card-title')).nativeElement.innerText
    ).toContain('b');
    expect(
      todoElements[1].query(By.css('mat-card-title span')).nativeElement
        .className
    ).toContain('crossed-out');
    expect(contentOfSecondMatCard[0].nativeElement.innerText).toContain(
      'Task is finished'
    );
  });
});
