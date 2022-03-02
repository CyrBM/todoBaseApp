import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DisplayListComponent } from './todos/display-list/display-list.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: '/todos' },
  { path: 'todos', component: DisplayListComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
