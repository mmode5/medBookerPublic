import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, forkJoin, map, mergeMap, of, switchMap } from 'rxjs';
import {
  flattenBookings,
  getEntityNumbers,
  mergeData,
} from 'src/app/functions/helper';
import {
  BookingResponse,
  Booking,
  Role,
  BookingStatus,
} from 'src/app/models/entity.model';
import { AuthService } from 'src/app/services/auth.service';
import { BookingService } from 'src/app/services/booking.service';
import { PractitionerService } from 'src/app/services/practitioner.service';
import * as UpcomingConsultationsActions from '../actions/upcomingConsultations.action';

@Injectable({ providedIn: 'root' })
export class upcomingConsultationEffects {
  constructor(
    private actions$: Actions,
    private bookingService: BookingService,
    private practitionerService: PractitionerService,
    private auth: AuthService
  ) {}

  loadUpcomingConsultations$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(UpcomingConsultationsActions.loadUpcomingBookings),
      mergeMap((action) => {
        return this.bookingService
          .getAllBookings(action.entityNo, new Date().toISOString(), '')
          .pipe(
            map((response: BookingResponse) => {
              return flattenBookings(response).filter(
                (x: Booking) => x.status == BookingStatus.CONFIRMED
              );
            }),
            switchMap((bookings: Booking[]) => {
              if (action.entityNo === Role.PATIENT && bookings.length) {
                return forkJoin(
                  getEntityNumbers(bookings).map((entiyNo) =>
                    this.practitionerService.retrieveSinglePractitioner(
                      Number(entiyNo)
                    )
                  )
                ).pipe(
                  map((doctors) => {
                    return bookings.map((booking) => {
                      return mergeData(booking, doctors);
                    });
                  })
                );
              }
              return of(bookings);
            }),

            map((bookings: Booking[]) => {
              return UpcomingConsultationsActions.loadUpcomingBookingsSuccess({
                bookings,
              });
            }),
            catchError((error: string) => {
              return of(
                UpcomingConsultationsActions.loadUpcomingBookingsFailure({
                  error,
                })
              );
            })
          );
      })
    );
  });

  updatUpcomingConsultationStatus$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(UpcomingConsultationsActions.updateUpcomingBookingStatus),
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
                return UpcomingConsultationsActions.loadUpcomingBookings({
                  entityNo: this.auth.currentUser?.entityNo,
                });
              }

              return UpcomingConsultationsActions.updateUpcomingBookingStatusSuccess();
            }),
            catchError((error: string) => {
              return of(
                UpcomingConsultationsActions.updateUpcomingBookingStatusFailure()
              );
            })
          );
      })
    );
  });
}
