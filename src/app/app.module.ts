import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { StoreModule } from '@ngrx/store';
import { appReducer } from './store/reducers/todo.reducers';
import { EffectsModule } from '@ngrx/effects';
import { TodoEffects } from './store/effects/todo.effects';
import { environment } from '../environments/environment';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { DisplayListComponent } from './todos/display-list/display-list.component';
import { SharedModule } from './shared/shared.module';
import { DetailViewComponent } from './todos/detail-view/detail-view.component';
import { AddTodoDialogComponent } from './todos/add-todo-dialog/add-todo-dialog.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    DisplayListComponent,
    DetailViewComponent,
    AddTodoDialogComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    StoreModule.forRoot({ appState: appReducer }),
    EffectsModule.forRoot([TodoEffects]),
    StoreDevtoolsModule.instrument({
      maxAge: 25,
      logOnly: environment.production,
    }),
    SharedModule,
    ReactiveFormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
