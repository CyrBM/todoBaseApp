import { Component, OnDestroy } from '@angular/core';
import { catchError, first, map, Observable } from 'rxjs';
import { TodoModel } from '../../shared/models/todo.model';
import { Store } from '@ngrx/store';
import { ActivatedRoute, Router } from '@angular/router';
import {
  selectTodoFromId,
  selectTodosList,
} from '../../store/selectors/todo.selector';
import { getTodos, updateTodoState } from '../../store/actions/todo.actions';

@Component({
  selector: 'app-detail-view',
  templateUrl: './detail-view.component.html',
  styleUrls: ['./detail-view.component.scss'],
})
export class DetailViewComponent {
  currentTodo = this.store.select(
    selectTodoFromId(this.activatedRoute.snapshot.params['id'])
  );

  constructor(
    private readonly store: Store,
    private activatedRoute: ActivatedRoute
  ) {}

  closeTodo(todo: TodoModel) {
    this.store.dispatch(updateTodoState({ todo }));
  }
}
