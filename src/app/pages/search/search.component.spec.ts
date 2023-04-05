import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NbThemeModule } from '@nebular/theme';
import { StoreModule } from '@ngrx/store';
import { AuthService } from 'src/app/services/auth.service';
import { PatientsComponent } from '../patients/patients.component';
import { SingleConsultationComponent } from '../single-consultation/single-consultation.component';

import { SearchComponent } from './search.component';

describe('SearchComponent', () => {
  let component: SearchComponent;
  let fixture: ComponentFixture<SearchComponent>;
  let mockAuthService: AuthService;

  beforeEach(async () => {
    mockAuthService = jasmine.createSpyObj(['currentUser']);
    await TestBed.configureTestingModule({
      declarations: [SearchComponent],
      schemas: [NO_ERRORS_SCHEMA],
      imports: [StoreModule.forRoot({}), FormsModule, ReactiveFormsModule],
      providers: [{ provide: AuthService, useValue: mockAuthService }],
    }).compileComponents();

    fixture = TestBed.createComponent(SearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

let component: PatientsComponent;
let fixture: ComponentFixture<PatientsComponent>;
let mockAuthService: AuthService;
