import { TestBed } from '@angular/core/testing';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Observable, of } from 'rxjs';
import { AuthService } from './auth.service';

describe('AuthService', () => {
  let service: AuthService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [{ provide: AngularFireAuth, useClass: AngularFireAuthStunt }],
    });
    service = TestBed.inject(AuthService);
    spyOn(AuthService.prototype, 'login');
    spyOn(AuthService.prototype, 'register');
    spyOn(AuthService.prototype, 'logout');
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('login', () => {
    it('should be called with correct email and password', () => {
      const email = 'Test1@gmail.com';
      const password = 'test';
      service.login(email, password);
      expect(service.login).toHaveBeenCalledWith(email, password);
    });
  });

  describe('register', () => {
    it('should be called with correct email, password and currentUserData', () => {
      const email = 'Test1@gmail.com';
      const password = 'test';
      const currentUserData = {
        entityNO: 111,
        firstName: 'name',
        lastName: 'lastname',
      };
      service.register(email, password, currentUserData);
      expect(service.register).toHaveBeenCalledWith(
        email,
        password,
        currentUserData
      );
    });
  });

  describe('logout', () => {
    it('should be called', () => {
      service.logout(), expect(service.logout).toHaveBeenCalled();
    });
  });
});

class AngularFireAuthStunt {
  authState: Observable<firebase.default.UserInfo | null> = of({
    displayName: 'test',
    email: 'Test1@gmail.com',
    phoneNumber: null,
    photoURL: null,
    providerId: '111',
    uid: 'fff',
  });
}
