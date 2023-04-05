import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import * as UserActions from '../store/actions/user.actions';
@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(
    private auth: AngularFireAuth,
    private router: Router,
    private store: Store
  ) {}

  canActivate(): Observable<boolean> {
    return this.auth.authState.pipe(
      map((user) => {
        if (!user) {
          this.router.navigate(['/homepage']);
          return false;
        } else {
          this.store.dispatch(
            UserActions.loadUser({ user: JSON.parse(user.displayName || '') })
          );
          return true;
        }
      })
    );
  }
}
