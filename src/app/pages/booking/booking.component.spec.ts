import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FIREBASE_OPTIONS } from '@angular/fire/compat';
import { BrowserModule, By } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';
import {
  NbCardModule,
  NbDatepickerModule,
  NbSpinnerModule,
  NbStatusService,
  NbTimepickerModule,
} from '@nebular/theme';
import { StoreModule } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { Practitioner, RoleName } from 'src/app/models/entity.model';
import { AuthService } from 'src/app/services/auth.service';
import { environment } from 'src/envirements/envirement';

import { BookingComponent } from './booking.component';

describe('BookingComponent', () => {
  let component: BookingComponent;
  let fixture: ComponentFixture<BookingComponent>;
  let mockAuthService: AuthService;
  let practitioners$: Observable<Practitioner>;

  beforeEach(async () => {
    mockAuthService = jasmine.createSpyObj(['currentUser']);
    (practitioners$ = of({
      entityNo: 456,
      firstName: 'John',
      lastName: 'Smith',
    })),
      await TestBed.configureTestingModule({
        declarations: [BookingComponent],
        schemas: [NO_ERRORS_SCHEMA],
        imports: [RouterTestingModule, StoreModule.forRoot({})],
        providers: [
          { provide: AuthService, useValue: mockAuthService },
          { provide: FIREBASE_OPTIONS, useValue: environment.firebaseConfig },
          NbStatusService,
        ],
      }).compileComponents();

    fixture = TestBed.createComponent(BookingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have correct object', () => {
    fixture.componentInstance.practitioners$ = practitioners$;
    fixture.detectChanges();
    const userInfo = fixture.debugElement.query(By.css('.flex h6'));
    expect(userInfo.nativeElement.textContent).toBe('John Smith');
  });
});
