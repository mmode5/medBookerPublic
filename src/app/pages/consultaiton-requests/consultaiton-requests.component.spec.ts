import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { StoreModule } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Booking } from 'src/app/models/entity.model';
import { AuthService } from 'src/app/services/auth.service';

import { ConsultaitonRequestsComponent } from './consultaiton-requests.component';

describe('ConsultaitonRequestsComponent', () => {
  let component: ConsultaitonRequestsComponent;
  let fixture: ComponentFixture<ConsultaitonRequestsComponent>;
  let mockAuthService: AuthService;

  beforeEach(async () => {
    mockAuthService = jasmine.createSpyObj(['currentUser']);

    await TestBed.configureTestingModule({
      declarations: [ConsultaitonRequestsComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      imports: [StoreModule.forRoot({})],
      providers: [{ provide: AuthService, useValue: mockAuthService }],
    }).compileComponents();

    fixture = TestBed.createComponent(ConsultaitonRequestsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
