import { HttpClient, HttpParams } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {
  Booking,
  BookingRequest,
  BookingResponse,
  BookingStatusUpdateRequest,
} from '../models/entity.model';
import { API_BASE } from '../models/tokens';

@Injectable({
  providedIn: 'root',
})
export class BookingService {
  constructor(
    private http: HttpClient,
    @Inject(API_BASE) private apiBase: string
  ) {}

  createBooking(booking: BookingRequest): Observable<Booking> {
    return this.http.post<Booking>(
      `https://angular-bootcamp-api.omedialab.com/bootcamp-api/api/v1/booking/`,
      booking
    );
  }

  getAllBookings(
    entityNo: number,
    fromDate?: string,
    toDate?: string
  ): Observable<BookingResponse> {
    let params = new HttpParams();
    if (fromDate) params = params.append('fromDate', fromDate);
    if (toDate) params = params.append('toDate', toDate);
    return this.http.get<BookingResponse>(
      `${this.apiBase}/booking/attendee/${entityNo}`,
      {
        params,
      }
    );
  }

  updateBooking(
    bookingId: number,
    bookingInfo: BookingStatusUpdateRequest
  ): Observable<Booking> {
    return this.http.put<Booking>(
      `${this.apiBase}/booking/${bookingId}/status`,
      bookingInfo
    );
  }
}
