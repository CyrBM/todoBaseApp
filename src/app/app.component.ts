import { Component, HostListener, OnInit } from '@angular/core';
import { getTodos } from './store/actions/todo.actions';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'todoBaseApp';
}
