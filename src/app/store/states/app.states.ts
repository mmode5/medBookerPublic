import {
  requestedBookings,
  initialRequestedBookingsState,
} from './requestedBookings.state';
import { healthRecord, initialHealthRecordState } from './health-record.state';

import {
  InitialUpcomingConsultations,
  upcomingConsultations,
} from './upcomingConsultations.state';
import { initialPractitioners, practitioners } from './practitioners.state';
import { initialPatients, patients } from './patients.state';
import { initialUser, User } from './user.state';

export interface AppState {
  healthRecord: healthRecord;
  requestedBookings: requestedBookings;
  upcomingConsultations: upcomingConsultations;
  practitioners: practitioners;
  patients: patients;
  user: User;
}

// const initialAppState: AppState = {
//   healthRecord: initialHealthRecordState,
//   requestedBookings: initialRequestedBookingsState,
//   upcomingConsultations: InitialUpcomingConsultations,
//   practitioners: initialPractitioners,
//   patients: initialPatients,
//   user:initialUser
// };
