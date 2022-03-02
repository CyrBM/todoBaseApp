import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpinnerComponent } from './spinner.component';
import { StoreModule } from '@ngrx/store';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { AppState } from '../../../store/reducers/todo.reducers';
import { MaterialModule } from '../../material/material.module';
import {
  selectIsLoading,
  selectTodosList,
} from '../../../store/selectors/todo.selector';
import { By } from '@angular/platform-browser';

describe('SpinnerComponent is display', () => {
  let component: SpinnerComponent;
  let fixture: ComponentFixture<SpinnerComponent>;
  let store: MockStore<AppState>;
  let mockLoadingSelector;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MaterialModule],
      declarations: [SpinnerComponent],
      providers: [provideMockStore()],
    }).compileComponents();
  });

  beforeEach(() => {
    store = TestBed.inject(MockStore);
    fixture = TestBed.createComponent(SpinnerComponent);
    component = fixture.componentInstance;
    mockLoadingSelector = store.overrideSelector(selectIsLoading, true);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should be display', () => {
    const matSpinner = fixture.debugElement.query(By.css('mat-spinner'));
    expect(matSpinner).toBeTruthy();
  });
});

describe('SpinnerComponent is not display', () => {
  let component: SpinnerComponent;
  let fixture: ComponentFixture<SpinnerComponent>;
  let store: MockStore<AppState>;
  let mockLoadingSelector;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MaterialModule],
      declarations: [SpinnerComponent],
      providers: [provideMockStore()],
    }).compileComponents();
  });

  beforeEach(() => {
    store = TestBed.inject(MockStore);
    fixture = TestBed.createComponent(SpinnerComponent);
    component = fixture.componentInstance;
    mockLoadingSelector = store.overrideSelector(selectIsLoading, false);
    fixture.detectChanges();
  });
  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should be not display', () => {
    const matSpinner = fixture.debugElement.query(By.css('mat-spinner'));
    expect(matSpinner).toBeFalsy();
  });
});
