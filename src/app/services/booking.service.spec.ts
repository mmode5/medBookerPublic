import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { BookingService } from './booking.service';
import { API_BASE } from '../models/tokens';
import { environment } from 'src/envirements/envirement';
import { BookingStatus, RoleName } from '../models/entity.model';

describe('BookingService', () => {
  let service: BookingService;
  let postBooking = {
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
    endDate: '2023-04-01T10:00:00',
    id: 123,
    organiser: 123,
    startDate: '2023-04-01T09:00:00',
    status: BookingStatus.CONFIRMED,
    statusComment: 'No issues to report',
    title: 'Example Booking',
  };

  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [{ provide: API_BASE, useValue: environment.apiBase }],
    });
    service = TestBed.inject(BookingService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('getAllBookings', () => {
    it('should make a request on correct URl', () => {
      service.getAllBookings(111).subscribe();
      const req = httpTestingController.expectOne(
        `${environment.apiBase}/booking/attendee/111`
      );
      expect(req.request.method).toEqual('GET');
      httpTestingController.verify();
    });
  });

  describe('updateBooking', () => {
    it('should make a request on correct URl and make a PUT request', () => {
      service
        .updateBooking(111, {
          bookingStatus: BookingStatus.CONFIRMED,
          includeDependent: true,
        })
        .subscribe();
      const req = httpTestingController.expectOne(
        `${environment.apiBase}/booking/111/status`
      );
      expect(req.request.method).toEqual('PUT');
      httpTestingController.verify();
    });
  });

  describe('createBooking', () => {
    it('should make a request on correct URl and make a POST request', () => {
      service.createBooking(postBooking).subscribe();
      const req = httpTestingController.expectOne(
        `${environment.apiBase}/booking/`
      );
      expect(req.request.method).toEqual('POST');
      httpTestingController.verify();
    });
  });
});
