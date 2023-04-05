import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { filter, map, Observable } from 'rxjs';
import { Role } from '../models/entity.model';
import { getUser } from '../store/selectors/user.selector';
import { Store } from '@ngrx/store';
@Injectable({
  providedIn: 'root',
})
export class PatientGuard implements CanActivate {
  constructor(private router: Router, private store: Store) {}
  canActivate(): Observable<boolean> {
    return this.store.select(getUser).pipe(
      filter((user) => !!user),
      map((user) => {
        if (user?.entityNo === Role.DOCTOR) {
          this.router.navigate(['/dashboard']);
          return false;
        } else {
          return true;
        }
      })
    );
  }
}
