import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import {
  Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot,
} from '@angular/router';
import { filter, map, Observable, take } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UsernameResolver implements Resolve<any> {
  constructor(private fireAuth: AngularFireAuth) {}
  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<any> {
    return this.fireAuth.authState.pipe(
      filter((user: any) => !!user),
      map((user: any) => JSON.parse(user?.displayName)),
      take(1)
    );
  }
}
