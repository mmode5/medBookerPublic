import { Booking } from 'src/app/models/entity.model';

export interface upcomingConsultations {
  upcomingConsultations: Booking[];
  selectedUpcomingBooking: Booking | undefined;
}

export const InitialUpcomingConsultations: upcomingConsultations = {
  upcomingConsultations: [],
  selectedUpcomingBooking: undefined,
};
