import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { from } from 'rxjs';
import { Entity } from '../models/entity.model';
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private _currentUser: Entity | undefined;

  constructor(private fireAuth: AngularFireAuth, private router: Router) {}

  public set currentUser(user: any) {
    this._currentUser = user;
  }

  public get currentUser(): Entity | undefined {
    return this._currentUser;
  }

  public get logInState() {
    return this.fireAuth.authState;
  }

  login(email: string, password: string) {
    return from(this.fireAuth.signInWithEmailAndPassword(email, password));
  }

  register(email: string, password: string, displayName: any) {
    return from(
      this.fireAuth
        .createUserWithEmailAndPassword(email, password)
        .then((result) => {
          return result.user?.updateProfile({
            displayName: JSON.stringify(displayName),
          });
        })
    );
  }

  logout() {
    this.fireAuth.signOut().then(() => {
      this.router.navigate(['/homepage']);
    });
  }
}
