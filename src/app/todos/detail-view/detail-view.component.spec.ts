import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailViewComponent } from './detail-view.component';
import { SharedModule } from '../../shared/shared.module';
import { DisplayListComponent } from '../display-list/display-list.component';
import {
  selectTodoFromId,
  selectTodosList,
} from '../../store/selectors/todo.selector';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { AppState } from '../../store/reducers/todo.reducers';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { TodoModel } from '../../shared/models/todo.model';
import { By } from '@angular/platform-browser';

describe('DetailViewComponent', () => {
  let component: DetailViewComponent;
  let fixture: ComponentFixture<DetailViewComponent>;
  let store: MockStore<AppState>;
  let mockTodoDetailSelector;
  const mockDate = new Date();

  const mockedTodo: TodoModel = {
    id: '6a25',
    isClosed: true,
    title: 'Test todo close',
    description: 'Lorem',
    lastUpdate: mockDate,
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        SharedModule,
        HttpClientTestingModule,
        RouterTestingModule.withRoutes([]),
      ],
      declarations: [DetailViewComponent],
      providers: [provideMockStore()],
    }).compileComponents();
  });

  beforeEach(() => {
    store = TestBed.inject(MockStore);
    mockTodoDetailSelector = store.overrideSelector(
      selectTodoFromId(mockedTodo.id),
      mockedTodo
    );
    fixture = TestBed.createComponent(DetailViewComponent);
    component = fixture.componentInstance;

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display Detail as title', () => {
    expect(
      fixture.debugElement.query(By.css('h2')).nativeElement.innerText
    ).toEqual('Detail :');
  });

  it('should display all detail of todo', () => {
    const todoCard = fixture.debugElement.query(By.css('mat-card'));
    // TODO a fix
    const todoCardContent = todoCard
      .query(By.css('mat-card-content'))
      .queryAll(By.css('description-content'));
    expect(
      todoCard.query(By.css('mat-card-title')).nativeElement.innerText
    ).toEqual(mockedTodo.title);

    expect(
      todoCard.query(By.css('mat-card-content')).nativeElement.innerText
    ).toEqual(mockedTodo.title);

    expect(
      todoCardContent[0].query(By.css('p')).nativeElement.innerText
    ).toEqual(mockedTodo.description);
    expect(
      todoCardContent[1].query(By.css('p')).nativeElement.innerText
    ).toEqual('Task is finished !');
  });
});
