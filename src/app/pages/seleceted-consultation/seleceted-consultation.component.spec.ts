import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { Booking, BookingStatus, RoleName } from 'src/app/models/entity.model';
import { AuthService } from 'src/app/services/auth.service';

import { SelecetedConsultationComponent } from './seleceted-consultation.component';

describe('SelecetedConsultationComponent', () => {
  let component: SelecetedConsultationComponent;
  let fixture: ComponentFixture<SelecetedConsultationComponent>;
  let mockAuthService: AuthService;
  let selectedBooking: Booking;

  beforeEach(async () => {
    mockAuthService = jasmine.createSpyObj(['currentUser']);
    (selectedBooking = {
      attendees: [
        {
          attendeeType: RoleName.PATIENT,
          entity: {
            entityNo: 123,
            firstName: 'Jane',
            lastName: 'DOe',
          },
          entityNo: 123,
        },
        {
          attendeeType: RoleName.DOCTOR,
          entity: {
            entityNo: 456,
            firstName: 'John',
            lastName: 'Smith',
          },
          entityNo: 456,
        },
      ],
      description: 'Lorem ipsum dolor sit amet',
      endTime: '2023-04-01T10:00:00',
      id: 123,
      startTime: '2023-04-01T09:00:00',
      status: BookingStatus.CONFIRMED,
      statusComment: 'No issues to report',
      title: 'Example Booking',
    }),
      await TestBed.configureTestingModule({
        declarations: [SelecetedConsultationComponent],
        providers: [{ provide: AuthService, useValue: mockAuthService }],
      }).compileComponents();

    fixture = TestBed.createComponent(SelecetedConsultationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have correct consult object', () => {
    fixture.componentInstance.selectedBooking = selectedBooking;
    fixture.detectChanges();
    expect(fixture.componentInstance.selectedBooking.id).toEqual(123);
  });

  it('should display the selected booking status', () => {
    fixture.componentInstance.selectedBooking = selectedBooking;
    fixture.detectChanges();

    const statusElement = fixture.debugElement.query(By.css('.info p'));

    if (statusElement) {
      expect(statusElement.nativeElement.textContent).toContain('CONFIRMED');
    }
  });
});
