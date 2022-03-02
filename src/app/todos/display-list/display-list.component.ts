import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { TodoModel } from '../../shared/models/todo.model';
import { Store } from '@ngrx/store';
import { selectTodosList } from '../../store/selectors/todo.selector';
import { getTodos, updateTodoState } from '../../store/actions/todo.actions';
import { MatCheckboxChange } from '@angular/material/checkbox';
import { Router } from '@angular/router';

@Component({
  selector: 'app-display-list',
  templateUrl: './display-list.component.html',
  styleUrls: ['./display-list.component.scss'],
})
export class DisplayListComponent implements OnInit {
  todos$: Observable<TodoModel[]>;

  constructor(private readonly store: Store, private router: Router) {
    this.todos$ = this.store.select(selectTodosList);
  }

  ngOnInit(): void {
    this.store.dispatch(getTodos());
  }

  changeCheckbox(todo: TodoModel): void {
    this.store.dispatch(updateTodoState({ todo: todo }));
  }

  goToDetails(id: string): void {
    this.router.navigate([`todo-detail/${id}`]);
  }
}
