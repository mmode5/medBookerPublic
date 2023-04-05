import { createAction, props } from '@ngrx/store';
import { Booking, BookingStatus } from 'src/app/models/entity.model';

export const loadUpcomingBookings = createAction(
  '[API] load upcoming bookings',
  props<{ entityNo: number }>()
);

export const loadUpcomingBookingsSuccess = createAction(
  '[API] load upcoming bookings success',
  props<{ bookings: Booking[] }>()
);

export const loadUpcomingBookingsFailure = createAction(
  '[API] load upcoming bookings failure',
  props<{ error: string }>()
);

export const selectUpcomingBooking = createAction(
  '[upcomingConsultations] Select upcoming booking',
  props<{ booking: Booking }>()
);

export const clearUpcomingBooking = createAction(
  '[upcomingConsultations] Clear upcoming booking'
);

export const updateUpcomingBookingStatus = createAction(
  '[API] Update upcoming booking status',
  props<{ id: number; status: BookingStatus }>()
);

export const updateUpcomingBookingStatusSuccess = createAction(
  '[API] Update upcoming booking status Success'
);

export const updateUpcomingBookingStatusFailure = createAction(
  '[API] Update upcoming booking status Failure '
);
