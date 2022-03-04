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
import { ActivatedRoute } from '@angular/router';
import { MemoizedSelector } from '@ngrx/store';
import { CommonModule, DatePipe, UpperCasePipe } from '@angular/common';
import SpyObj = jasmine.SpyObj;
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';

describe('DetailViewComponent', () => {
  let component: DetailViewComponent;
  let fixture: ComponentFixture<DetailViewComponent>;
  let store: MockStore<AppState>;
  const mockDate = new Date();
  // const datePipeSpy = jasmine.createSpy('datePipe');

  /* datePipeSpy.transform.and.callFake(((...args: unknown[]) => {
    return JSON.stringify(args);
  }) as DatePipe['transform']);
  upperCasePipeSpy.transform.and.callFake(((...args: unknown[]) =>
    JSON.stringify(args)) as UpperCasePipe['transform']);*/

  const mockedTodo: TodoModel = {
    id: '6a25',
    isClosed: true,
    title: 'Test todo close',
    description: 'Lorem',
    lastUpdate: mockDate,
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        CommonModule,
        MatCardModule,
        MatIconModule,
        MatDividerModule,
        HttpClientTestingModule,
        RouterTestingModule.withRoutes([]),
      ],
      declarations: [DetailViewComponent],
      providers: [
        provideMockStore({
          selectors: [{ selector: selectTodosList, value: [mockedTodo] }],
        }),
        /* { provide: DatePipe, useValue: { transform: datePipeSpy } },
        { provide: UpperCasePipe, useValue: upperCasePipeSpy },*/
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: {
              params: {
                id: mockedTodo.id,
              },
            },
          },
        },
      ],
    });

    fixture = TestBed.createComponent(DetailViewComponent);
    component = fixture.componentInstance;
    store = TestBed.inject(MockStore);
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
    const todoCardContent = todoCard
      .query(By.css('mat-card-content'))
      .queryAll(By.css('div'));

    expect(
      todoCard.query(By.css('mat-card-title')).nativeElement.innerText
    ).toEqual(mockedTodo.title.toUpperCase());
    expect(
      todoCardContent[0].query(By.css('p')).nativeElement.innerText
    ).toEqual(mockedTodo.description);
    expect(
      todoCardContent[1].query(By.css('p')).nativeElement.innerText
    ).toEqual('Task is finished !');

    /* expect(
      todoCardContent[2].query(By.css('p')).nativeElement.innerText
    ).toEqual(` Last update : ['${mockedTodo.lastUpdate}', 'medium']`);
*/
    //expect(upperCasePipeSpy).toHaveBeenCalledTimes(1);
    /*    expect(datePipeSpy.transform).toHaveBeenCalledWith(
      mockedTodo.lastUpdate,
      'medium'
    );*/
  });
});
