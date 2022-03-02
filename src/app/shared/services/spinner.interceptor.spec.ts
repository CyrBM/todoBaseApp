import { TestBed } from '@angular/core/testing';

import { SpinnerInterceptor } from './spinner.interceptor';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { AppState, initialState } from '../../store/reducers/todo.reducers';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import {
  HTTP_INTERCEPTORS,
  HttpClient,
  HttpClientModule,
} from '@angular/common/http';
import { MockBuilder, MockRender, NG_MOCKS_INTERCEPTORS } from 'ng-mocks';
import { selectIsLoading } from '../../store/selectors/todo.selector';
import { first, of } from 'rxjs';
import { provideMockActions } from '@ngrx/effects/testing';
import { loadSpinner } from '../../store/actions/todo.actions';

describe('SpinnerInterceptor', () => {
  let store: MockStore<AppState>;

  let actions$: any;

  beforeEach(() =>
    TestBed.configureTestingModule({
      providers: [
        SpinnerInterceptor,
        provideMockActions(() => actions$),
        provideMockStore({ initialState }),
      ],
    })
  );

  beforeEach(() => {
    return MockBuilder(SpinnerInterceptor)
      .exclude(NG_MOCKS_INTERCEPTORS)
      .keep(HTTP_INTERCEPTORS)
      .replace(HttpClientModule, HttpClientTestingModule);
  });

  beforeEach(() => {
    store = TestBed.inject(MockStore);
  });

  it('should be created', () => {
    const interceptor: SpinnerInterceptor = TestBed.inject(SpinnerInterceptor);
    expect(interceptor).toBeTruthy();
  });

  it('triggers interceptor', () => {
    actions$ = of({ type: loadSpinner });
    const expectedAction = loadSpinner();
    const dispatchSpy = spyOn(store, 'dispatch');
    const fixture = MockRender('');
    const client: HttpClient = fixture.debugElement.injector.get(HttpClient);
    const httpMock: HttpTestingController = fixture.debugElement.injector.get(
      HttpTestingController
    );

    // Let's do a simply request.
    client.get('/todos').subscribe();

    const req = httpMock.expectOne('/todos');
    req.flush('');
    httpMock.verify();

    /* store
      .select(selectIsLoading)
      .pipe(first())
      .subscribe((loading: boolean) => {
        expect(loading).toBeTrue();
      });*/
    //expect(dispatchSpy).toHaveBeenCalledWith(expectedAction);
  });
});
