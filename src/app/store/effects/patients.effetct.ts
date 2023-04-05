import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, debounceTime, map, of, switchMap } from 'rxjs';
import { Booking, BookingStatus, Entity } from 'src/app/models/entity.model';
import { BookingService } from 'src/app/services/booking.service';
import { MemberService } from 'src/app/services/member.service';
import * as PatientsAction from '../actions/patients.action';

@Injectable({ providedIn: 'root' })
export class patientEffects {
  constructor(
    private actions$: Actions,
    private member: MemberService,
    private bookingService: BookingService
  ) {}
  patients$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(PatientsAction.loadPatients),
      switchMap((action) => {
        return this.member.retrieveAllMembers();
      }),
      map((patients: Entity[]) => {
        return PatientsAction.loadPatientsSuccess({
          patients: patients,
        });
      }),
      catchError((error) => of(PatientsAction.loadPatientsFailure({ error })))
    );
  });

  searchPatients$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(PatientsAction.searchPatients),
      debounceTime(500),
      switchMap((action) => {
        if (!action.firstName && !action.lastName) {
          return this.member.retrieveAllMembers().pipe(
            map((patients: Entity[]) =>
              PatientsAction.loadPatientsSuccess({
                patients: patients,
              })
            )
          );
        }
        return this.member
          .searchMembers(action.firstName, action.lastName)
          .pipe(
            map((patients: Entity[]) => {
              return PatientsAction.searchPatientsSuccess({
                patients: patients,
              });
            })
          );
      })
    );
  });

  selectPatient$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(PatientsAction.selectPatient),
      switchMap((action) => {
        return this.member.retrieveSingleMember(action.entityNo);
      }),
      map((patient: Entity) => {
        return PatientsAction.selectPatientSuccess({
          patient: patient,
        });
      }),
      catchError((error) => of(PatientsAction.selectPatientFailure({ error })))
    );
  });

  bookPatient$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(PatientsAction.bookPatient),
      switchMap((action) => {
        return this.bookingService.createBooking(action.bookingRequest).pipe(
          switchMap((booking: Booking) => {
            return this.bookingService.updateBooking(booking.id, {
              bookingStatus: BookingStatus.CONFIRMED,
              comment: 'string',
              includeDependent: true,
            });
          })
        );
      }),
      map((booking: Booking) => {
        return PatientsAction.bookPatientSuccess();
      }),
      catchError((error: string) => {
        return of(PatientsAction.bookPatientFailure());
      })
    );
  });
}
