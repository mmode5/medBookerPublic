import { createReducer, on } from '@ngrx/store';
import {
  healthRecord,
  initialHealthRecordState,
} from '../states/health-record.state';
import * as HealthRecordActions from '../actions/healthRecord.actions';

export const healthRecordReducer = createReducer(
  initialHealthRecordState,
  on(
    HealthRecordActions.loadPastBookingsSuccess,
    (state, action): healthRecord => {
      return {
        ...state,
        pastBookings: action.bookings,
      };
    }
  ),
  on(HealthRecordActions.loadPastBookingsFailure, (state): healthRecord => {
    return {
      ...state,
      pastBookings: [],
      selectedPastBooking: undefined,
    };
  }),
  on(HealthRecordActions.selectPastBooking, (state, action): healthRecord => {
    return {
      ...state,
      selectedPastBooking: action.booking,
    };
  }),
  on(HealthRecordActions.clearPastBooking, (state): healthRecord => {
    return {
      ...state,
      selectedPastBooking: undefined,
    };
  })
);
