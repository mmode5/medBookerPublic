import { createAction, props } from '@ngrx/store';
import { BookingRequest, Practitioner } from 'src/app/models/entity.model';

export const loadPractitioners = createAction('[API] load practitioners');

export const loadPractitionersSuccess = createAction(
  '[API] load practitioners success',
  props<{ practitioners: Practitioner[] }>()
);

export const loadPractitionersFailure = createAction(
  '[API] load practitioners failure',
  props<{ error: string }>()
);

export const searchPractitioners = createAction(
  '[API] search practitioners',
  props<{
    firstName?: string | null | undefined;
    lastName?: string | null | undefined;
  }>()
);

export const searchPractitionersSuccess = createAction(
  '[API] search practitioners success',
  props<{ practitioners: Practitioner[] }>()
);

export const searchPractitionersFailure = createAction(
  '[API] search practitioners failure',
  props<{ error: string }>()
);

export const selectPractitioner = createAction(
  '[API] select practitioners',
  props<{
    entityNo: number;
  }>()
);

export const selectPractitionerSuccess = createAction(
  '[API] select practitioner success',
  props<{ practitioner: Practitioner }>()
);

export const selectPractitionersFailure = createAction(
  '[API] select practitioner failure',
  props<{ error: string }>()
);

export const clearSelectedPractitioner = createAction(
  '[API] select practitioner failure'
);

export const bookPractitioner = createAction(
  '[API] book practitioner',
  props<{ bookingRequest: BookingRequest }>()
);

export const bookPractitionerSuccess = createAction(
  '[API] book practitioner success'
);
export const bookPractitionerFailure = createAction(
  '[API] book practitioner failure'
);
