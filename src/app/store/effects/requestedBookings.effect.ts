import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, mergeMap, of } from 'rxjs';
import { flattenBookings } from 'src/app/functions/helper';
import {
  BookingResponse,
  Booking,
  BookingStatus,
} from 'src/app/models/entity.model';
import { AuthService } from 'src/app/services/auth.service';
import { BookingService } from 'src/app/services/booking.service';
import * as RequestedBookingsAction from '../actions/requestedBookings.actions';

@Injectable({ providedIn: 'root' })
export class requestedBookingEffects {
  constructor(
    private actions$: Actions,
    private bookingService: BookingService,
    private auth: AuthService
  ) {}

  loadRequestedBooking$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(RequestedBookingsAction.loadRequestedBookings),
      mergeMap((action) => {
        return this.bookingService
          .getAllBookings(action.entityNo, new Date().toISOString())
          .pipe(
            map((response: BookingResponse) => {
              return flattenBookings(response).filter(
                (x: Booking) => x.status == BookingStatus.TENTATIVE
              );
            }),
            map((bookings: Booking[]) => {
              return RequestedBookingsAction.loadRequestedBookingsSuccess({
                bookings,
              });
            }),
            catchError((error: string) => {
              return of(
                RequestedBookingsAction.loadRequestedBookingsFailure({ error })
              );
            })
          );
      })
    );
  });

  updateRequestedBookingStatus$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(RequestedBookingsAction.updateRequestedBookingStatus),
      mergeMap((action) => {
        return this.bookingService
          .updateBooking(action.id, {
            bookingStatus: action.status,
            comment: '',
            includeDependent: true,
          })
          .pipe(
            map((booking: Booking) => {
              if (this.auth.currentUser?.entityNo) {
                return RequestedBookingsAction.loadRequestedBookings({
                  entityNo: this.auth.currentUser?.entityNo,
                });
              }

              return RequestedBookingsAction.updateRequestedBookingStatusSuccess();
            }),
            catchError((error: string) => {
              return of(
                RequestedBookingsAction.updateRequestedBookingStatusFailure()
              );
            })
          );
      })
    );
  });
}
