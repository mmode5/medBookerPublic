import { createReducer, on } from '@ngrx/store';
import {
  requestedBookings,
  initialRequestedBookingsState,
} from '../states/requestedBookings.state';
import * as PractitionerActions from '../actions/requestedBookings.actions';

export const requestedBookingsdReducer = createReducer(
  initialRequestedBookingsState,
  on(
    PractitionerActions.loadRequestedBookingsSuccess,
    (state, action): requestedBookings => {
      return {
        ...state,
        requestedBookings: action.bookings,
      };
    }
  ),
  on(
    PractitionerActions.loadRequestedBookingsFailure,
    (state): requestedBookings => {
      return {
        ...state,
        requestedBookings: [],
      };
    }
  )
);
