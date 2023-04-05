import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, forkJoin, map, mergeMap, of, switchMap } from 'rxjs';
import {
  flattenBookings,
  getEntityNumbers,
  mergeData,
} from 'src/app/functions/helper';
import { BookingResponse, Booking, Role } from 'src/app/models/entity.model';
import { BookingService } from 'src/app/services/booking.service';
import { PractitionerService } from 'src/app/services/practitioner.service';
import * as HealthRecordActions from '../actions/healthRecord.actions';

@Injectable({ providedIn: 'root' })
export class healthRecordEffects {
  constructor(
    private actions$: Actions,
    private bookingService: BookingService,
    private practitionerService: PractitionerService
  ) {}

  loadPastBookings$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(HealthRecordActions.loadPastBookings),
      mergeMap((action) => {
        return this.bookingService
          .getAllBookings(action.entityNo, '', new Date().toISOString())
          .pipe(
            map((response: BookingResponse) => {
              return flattenBookings(response);
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
              return HealthRecordActions.loadPastBookingsSuccess({ bookings });
            }),
            catchError((error: string) => {
              return of(HealthRecordActions.loadPastBookingsFailure({ error }));
            })
          );
      })
    );
  });
}
