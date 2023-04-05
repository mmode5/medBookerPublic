import { createAction, props } from '@ngrx/store';
import { Booking, BookingStatus } from 'src/app/models/entity.model';

export const loadRequestedBookings = createAction(
  '[API] load Requested bookings',
  props<{ entityNo: number }>()
);

export const loadRequestedBookingsSuccess = createAction(
  '[API] load Requested bookings success',
  props<{ bookings: Booking[] }>()
);

export const loadRequestedBookingsFailure = createAction(
  '[API] load Requested bookings failure',
  props<{ error: string }>()
);

export const updateRequestedBookingStatus = createAction(
  '[API] Update Requested  booking status',
  props<{ id: number; status: BookingStatus }>()
);

export const updateRequestedBookingStatusSuccess = createAction(
  '[API] Update Requested booking status Success'
);

export const updateRequestedBookingStatusFailure = createAction(
  '[API] Update Requested booking status Failure '
);
