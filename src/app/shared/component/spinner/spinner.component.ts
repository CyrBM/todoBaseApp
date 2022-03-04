import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { selectIsLoading } from '../../../store/selectors/todo.selector';

@Component({
  selector: 'app-spinner',
  templateUrl: './spinner.component.html',
  styleUrls: ['./spinner.component.scss'],
})
export class SpinnerComponent {
  spinnerLoading$: Observable<boolean> = this.store.select(selectIsLoading);

  constructor(private readonly store: Store) {}
}
