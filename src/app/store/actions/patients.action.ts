import { createAction, props } from '@ngrx/store';
import { BookingRequest, Entity } from 'src/app/models/entity.model';

export const loadPatients = createAction('[API] load patients');

export const loadPatientsSuccess = createAction(
  '[API] load patients success',
  props<{ patients: Entity[] }>()
);

export const loadPatientsFailure = createAction(
  '[API] load patients failure',
  props<{ error: string }>()
);

export const searchPatients = createAction(
  '[API] search patients',
  props<{
    firstName?: string | null | undefined;
    lastName?: string | null | undefined;
  }>()
);

export const searchPatientsSuccess = createAction(
  '[API] search patients success',
  props<{ patients: Entity[] }>()
);

export const searchPatientsFailure = createAction(
  '[API] search patients failure',
  props<{ error: string }>()
);

export const selectPatient = createAction(
  '[API] select patient',
  props<{
    entityNo: number;
  }>()
);

export const selectPatientSuccess = createAction(
  '[API] select patient success',
  props<{ patient: Entity }>()
);

export const selectPatientFailure = createAction(
  '[API] select patient failure',
  props<{ error: string }>()
);

export const clearSelectPatient = createAction('[API] clear select patient');

export const bookPatient = createAction(
  '[API] book patient',
  props<{ bookingRequest: BookingRequest }>()
);

export const bookPatientSuccess = createAction('[API] book patient success');
export const bookPatientFailure = createAction('[API] book patient failure');
