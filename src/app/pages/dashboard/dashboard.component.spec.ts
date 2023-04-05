import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { StoreModule } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import {
  Booking,
  BookingStatus,
  Entity,
  Role,
  RoleName,
} from 'src/app/models/entity.model';
import { AuthService } from 'src/app/services/auth.service';
import { SingleConsultationComponent } from '../single-consultation/single-consultation.component';

import { DashboardComponent } from './dashboard.component';
import * as RequestedBookingsAction from '../../store/actions/requestedBookings.actions';

describe('DashboardComponent', () => {
  let component: DashboardComponent;
  let fixture: ComponentFixture<DashboardComponent>;
  let mockAuthService: AuthService;
  let mockbookings$: Observable<Booking[]>;

  beforeEach(async () => {
    mockAuthService = jasmine.createSpyObj('AuthService', ['currentUser']);
    mockbookings$ = of([
      {
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
      },
      {
        attendees: [
          {
            attendeeType: RoleName.PATIENT,
            entity: {
              entityNo: 3,
              firstName: 'Alice',
              lastName: 'Smith',
            },
            entityNo: 3,
          },
          {
            attendeeType: RoleName.DOCTOR,
            entity: {
              entityNo: 4,
              firstName: 'Bob',
              lastName: 'Johnson',
            },
            entityNo: 4,
          },
        ],
        description: 'Quarterly team meeting',
        endTime: '2023-07-01T17:00:00.000Z',
        id: 456,
        startTime: '2023-07-01T15:00:00.000Z',
        status: BookingStatus.CONFIRMED,
        title: 'Q2 Team Meeting',
      },
    ]);
    await TestBed.configureTestingModule({
      declarations: [DashboardComponent, SingleConsultationComponent],
      imports: [StoreModule.forRoot({})],
      providers: [{ provide: AuthService, useValue: mockAuthService }],
    }).compileComponents();

    fixture = TestBed.createComponent(DashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call loadRequestedBookings() with correct arguments', () => {
    const mockEntityNo = 123;
    spyOn(component['store'], 'dispatch');
    component.currentUser = { entityNo: mockEntityNo } as Entity;
    component.getAllBookings();
    expect(component['store'].dispatch).toHaveBeenCalledWith(
      RequestedBookingsAction.loadRequestedBookings({ entityNo: mockEntityNo })
    );
  });

  // it('should render app-single-consultation', () => {
  //   fixture.componentInstance.bookings$ = mockbookings$;
  //   fixture.detectChanges();

  //   const deCard = fixture.debugElement.queryAll(
  //     By.css('app-single-consultation')
  //   );
  //   console.log(deCard);

  //   expect(deCard.length).toBe(2);
  // });
});
