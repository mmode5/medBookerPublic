import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, debounceTime, map, of, switchMap, tap } from 'rxjs';
import { Booking, Practitioner } from 'src/app/models/entity.model';
import { BookingService } from 'src/app/services/booking.service';
import { PractitionerService } from 'src/app/services/practitioner.service';
import * as PractitionerActions from '../actions/practitioners.actions';
@Injectable({ providedIn: 'root' })
export class practitionersEffects {
  constructor(
    private actions$: Actions,
    private practitionerService: PractitionerService,
    private bookingService: BookingService,
    private router: Router
  ) {}
  practitioners$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(PractitionerActions.loadPractitioners),
      switchMap((action) => {
        return this.practitionerService.retrieveAllPractitioners();
      }),
      map((practitioners: Practitioner[]) => {
        return PractitionerActions.loadPractitionersSuccess({
          practitioners: practitioners,
        });
      }),
      catchError((error) =>
        of(PractitionerActions.loadPractitionersFailure({ error }))
      )
    );
  });

  searchPractitioners$ = createEffect(() =>
    this.actions$.pipe(
      ofType(PractitionerActions.searchPractitioners),
      debounceTime(500),
      switchMap((action) => {
        if (!action.firstName && !action.lastName) {
          return this.practitionerService.retrieveAllPractitioners().pipe(
            map((practitioners: Practitioner[]) =>
              PractitionerActions.loadPractitionersSuccess({
                practitioners: practitioners,
              })
            )
          );
        }
        return this.practitionerService
          .searchPractitioners(action.firstName, action.lastName)
          .pipe(
            map((practitioners: Practitioner[]) => {
              return PractitionerActions.searchPractitionersSuccess({
                practitioners: practitioners,
              });
            })
          );
      })
    )
  );

  selectPractitioner$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(PractitionerActions.selectPractitioner),
      switchMap((action) => {
        return this.practitionerService.retrieveSinglePractitioner(
          action.entityNo
        );
      }),
      map((practitioner: Practitioner) => {
        return PractitionerActions.selectPractitionerSuccess({
          practitioner: practitioner,
        });
      }),
      catchError((error) =>
        of(PractitionerActions.selectPractitionersFailure({ error }))
      )
    );
  });

  bookPractitioner$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(PractitionerActions.bookPractitioner),
      switchMap((action) => {
        return this.bookingService.createBooking(action.bookingRequest);
      }),
      map((booking: Booking) => {
        return PractitionerActions.bookPractitionerSuccess();
      }),
      tap(() => {
        this.router.navigate(['/upcomingConsultations']);
      }),
      catchError((error: string) => {
        return of(PractitionerActions.bookPractitionerFailure());
      })
    );
  });
}
