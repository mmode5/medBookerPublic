import { createReducer, on } from '@ngrx/store';
import {
  InitialUpcomingConsultations,
  upcomingConsultations,
} from '../states/upcomingConsultations.state';
import * as UpcomingConsultationsActions from '../actions/upcomingConsultations.action';

export const upcomingConsultationsReducer = createReducer(
  InitialUpcomingConsultations,
  on(
    UpcomingConsultationsActions.loadUpcomingBookingsSuccess,
    (state, action): upcomingConsultations => {
      return {
        ...state,
        upcomingConsultations: action.bookings,
        selectedUpcomingBooking: undefined,
      };
    }
  ),
  on(
    UpcomingConsultationsActions.loadUpcomingBookingsFailure,
    (state): upcomingConsultations => {
      return {
        ...state,
        upcomingConsultations: [],
        selectedUpcomingBooking: undefined,
      };
    }
  ),
  on(
    UpcomingConsultationsActions.selectUpcomingBooking,
    (state, action): upcomingConsultations => {
      return {
        ...state,
        selectedUpcomingBooking: action.booking,
      };
    }
  ),
  on(
    UpcomingConsultationsActions.clearUpcomingBooking,
    (state): upcomingConsultations => {
      return {
        ...state,
        selectedUpcomingBooking: undefined,
      };
    }
  )
);
