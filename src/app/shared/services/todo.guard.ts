import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import {
  combineLatest,
  combineLatestWith,
  filter,
  map,
  Observable,
  of,
  takeLast,
  takeWhile,
  tap,
} from 'rxjs';
import { Store } from '@ngrx/store';
import { getDetailTodo } from '../../store/actions/todo.actions';
import { TodoModel } from '../models/todo.model';
import {
  selectIsLoading,
  selectTodoFromId,
} from '../../store/selectors/todo.selector';

@Injectable({
  providedIn: 'root',
})
export class TodoGuard implements CanActivate {
  constructor(private store: Store, private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean | UrlTree> {
    const idTodo = route.params['id'];
    this.store.dispatch(getDetailTodo({ idTodo }));

    return this.store.select(selectTodoFromId(idTodo)).pipe(
      combineLatestWith(this.store.select(selectIsLoading)),
      filter(([todo, isLoading]) => !!todo || isLoading === false),
      map(([todo, _]) =>
        todo !== undefined ? true : this.router.parseUrl('/')
      )
    );
  }
}
