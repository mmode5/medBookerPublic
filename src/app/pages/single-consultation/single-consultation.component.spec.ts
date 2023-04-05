import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Booking, BookingStatus, RoleName } from 'src/app/models/entity.model';
import { AuthService } from 'src/app/services/auth.service';

import { SingleConsultationComponent } from './single-consultation.component';

describe('SingleConsultationComponent', () => {
  let component: SingleConsultationComponent;
  let fixture: ComponentFixture<SingleConsultationComponent>;
  let mockAuthService: AuthService;
  let booking: Booking;

  beforeEach(async () => {
    mockAuthService = jasmine.createSpyObj(['currentUser']);
    (booking = {
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
        declarations: [SingleConsultationComponent],
        providers: [{ provide: AuthService, useValue: mockAuthService }],
      }).compileComponents();

    fixture = TestBed.createComponent(SingleConsultationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have correct consult object', () => {
    fixture.componentInstance.booking = booking;
    fixture.detectChanges();
    expect(fixture.componentInstance.booking.id).toEqual(123);
  });

  it('should display the correct start date', () => {
    fixture.componentInstance.booking = booking;
    fixture.detectChanges();

    const startDateElement = fixture.nativeElement.querySelector('.date');

    if (startDateElement) {
      expect(startDateElement.textContent.trim()).toContain(
        'Apr 1, 2023, 9:00:00 AM'
      );
    }
  });
});
