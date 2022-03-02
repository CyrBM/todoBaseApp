import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DisplayListComponent } from './todos/display-list/display-list.component';
import { DetailViewComponent } from './todos/detail-view/detail-view.component';
import { TodoGuard } from './shared/services/todo.guard';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: '/todos' },
  { path: 'todos', component: DisplayListComponent },
  {
    path: 'todo-detail/:id',
    component: DetailViewComponent,
    canActivate: [TodoGuard],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
