import { ActionReducerMap } from '@ngrx/store';
import { AppState } from '../states/app.states';
import { requestedBookingsdReducer } from './requestedBookings.reducer';
import { healthRecordReducer } from './healthRecord.reducer';
import { upcomingConsultationsReducer } from './upcomingConsultations.reducer';
import { patientsReducer } from './patients.reducer';
import { practitionersReducer } from './practitioners.reducer';
import { UserReducer } from './user.reducer';
export const reducers: ActionReducerMap<AppState> = {
  healthRecord: healthRecordReducer,
  requestedBookings: requestedBookingsdReducer,
  upcomingConsultations: upcomingConsultationsReducer,
  patients: patientsReducer,
  practitioners: practitionersReducer,
  user: UserReducer
};
