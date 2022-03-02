import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { TodoModel } from '../../shared/models/todo.model';
import { Store } from '@ngrx/store';
import { selectTodosList } from '../../store/selectors/todo.selector';
import { getTodos } from '../../store/actions/todo.actions';

@Component({
  selector: 'app-display-list',
  templateUrl: './display-list.component.html',
  styleUrls: ['./display-list.component.scss'],
})
export class DisplayListComponent implements OnInit {
  todos$: Observable<TodoModel[]>;

  constructor(private readonly store: Store) {
    this.todos$ = this.store.select(selectTodosList);
  }

  ngOnInit(): void {
    this.store.dispatch(getTodos());
  }
}
