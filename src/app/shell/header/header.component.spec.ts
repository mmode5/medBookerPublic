import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Observable, of } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';

import { HeaderComponent } from './header.component';

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HeaderComponent],
      providers: [{ provide: AngularFireAuth, useClass: AngularFireAuthStunt }],
    }).compileComponents();

    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
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
