import { createFeatureSelector, createSelector } from '@ngrx/store';
import { requestedBookings } from '../states/requestedBookings.state';

const selecetRequestedBookingsSate =
  createFeatureSelector<requestedBookings>('requestedBookings');

export const selectRequestedBookings = createSelector(
  selecetRequestedBookingsSate,
  (state) => state.requestedBookings
);
