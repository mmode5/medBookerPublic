import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { StoreModule } from '@ngrx/store';
import { AuthService } from 'src/app/services/auth.service';
import { SingleConsultationComponent } from '../single-consultation/single-consultation.component';
import * as PatientsAction from '../../store/actions/patients.action';
import { PatientsComponent } from './patients.component';
import { of } from 'rxjs';
import { By } from '@angular/platform-browser';

import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('PatientsComponent', () => {
  let component: PatientsComponent;
  let fixture: ComponentFixture<PatientsComponent>;
  let mockAuthService: AuthService;

  beforeEach(async () => {
    mockAuthService = jasmine.createSpyObj(['currentUser']);
    await TestBed.configureTestingModule({
      declarations: [PatientsComponent, SingleConsultationComponent],
      schemas: [NO_ERRORS_SCHEMA],
      imports: [StoreModule.forRoot({}), FormsModule, ReactiveFormsModule],
      providers: [{ provide: AuthService, useValue: mockAuthService }],
    }).compileComponents();

    fixture = TestBed.createComponent(PatientsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should dispatch the selectPatient action with correct parameters', () => {
    const entityId = 1;
    const spy = spyOn(component['store'], 'dispatch').and.callThrough();
    component.selectMember(entityId);
    expect(spy).toHaveBeenCalledWith(
      PatientsAction.selectPatient({ entityNo: entityId })
    );
  });

  it('should call the Book method when the "Book" button is clicked', () => {
    const mockMember = { firstName: 'John', lastName: 'Doe', entityNo: 123 };
    component.selectedMember$ = of(mockMember);
    fixture.detectChanges();

    const spy = spyOn(component, 'Book');
    const button = fixture.debugElement.query(By.css('button')).nativeElement;

    button.click();
    expect(spy).toHaveBeenCalledWith(mockMember);
  });
});
