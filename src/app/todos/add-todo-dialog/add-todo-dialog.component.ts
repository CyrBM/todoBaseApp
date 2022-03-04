import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { TodoModel } from '../../shared/models/todo.model';

@Component({
  selector: 'app-add-todo-dialog',
  templateUrl: './add-todo-dialog.component.html',
  styleUrls: ['./add-todo-dialog.component.scss'],
})
export class AddTodoDialogComponent {
  formGroup: FormGroup = this.fb.group({
    title: ['', Validators.required],
    description: [''],
  });

  constructor(
    public dialogRef: MatDialogRef<AddTodoDialogComponent>,
    private fb: FormBuilder
  ) {}

  closeModalWithTodoCreated(): void {
    // generation id in this method to facilitate, WARN not to do in prod
    const todo: TodoModel = {
      id: performance.now().toString(36),
      title: this.controlTitle.value,
      description: this.controlDescription.value,
      isClosed: false,
      lastUpdate: new Date(),
    };
    this.dialogRef.close(todo);
  }

  cancelForm(): void {
    this.dialogRef.close(null);
  }

  get controlTitle(): FormControl {
    return this.formGroup.get('title') as FormControl;
  }

  get controlDescription(): FormControl {
    return this.formGroup.get('description') as FormControl;
  }
}
