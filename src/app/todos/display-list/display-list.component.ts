import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { TodoModel } from '../../shared/models/todo.model';
import { Store } from '@ngrx/store';
import { selectTodosList } from '../../store/selectors/todo.selector';
import {
  addNewTodo,
  getTodos,
  updateTodoState,
} from '../../store/actions/todo.actions';
import { MatCheckboxChange } from '@angular/material/checkbox';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { AddTodoDialogComponent } from '../add-todo-dialog/add-todo-dialog.component';

@Component({
  selector: 'app-display-list',
  templateUrl: './display-list.component.html',
  styleUrls: ['./display-list.component.scss'],
})
export class DisplayListComponent implements OnInit {
  todos$: Observable<TodoModel[]> = this.store.select(selectTodosList);

  constructor(
    private readonly store: Store,
    private router: Router,
    private matDialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.store.dispatch(getTodos());
  }

  changeCheckbox(todo: TodoModel): void {
    this.store.dispatch(updateTodoState({ todo: todo }));
  }

  goToDetails(id: string): void {
    this.router.navigate([`todo-detail/${id}`]);
  }

  addNewTodo(): void {
    const dialogRef = this.matDialog.open(AddTodoDialogComponent, {
      width: '400px',
    });
    dialogRef.afterClosed().subscribe((result: TodoModel | null) => {
      if (result) {
        this.store.dispatch(addNewTodo({ todo: result }));
      }
    });
  }
}
