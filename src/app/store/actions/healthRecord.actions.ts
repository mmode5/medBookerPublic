import { createAction, props } from '@ngrx/store';
import { Booking } from 'src/app/models/entity.model';

export const loadPastBookings = createAction(
  '[API] load past bookings',
  props<{ entityNo: number }>()
);

export const loadPastBookingsSuccess = createAction(
  '[API] load past bookings success',
  props<{ bookings: Booking[] }>()
);

export const loadPastBookingsFailure = createAction(
  '[API] load past bookings failure',
  props<{ error: string }>()
);

export const selectPastBooking = createAction(
  '[HealthRecord] Select past booking',
  props<{ booking: Booking }>()
);

export const clearPastBooking = createAction(
  '[HealthRecord] Clear past booking'
);
