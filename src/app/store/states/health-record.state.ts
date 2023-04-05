import { Booking } from 'src/app/models/entity.model';

export interface healthRecord {
  pastBookings: Booking[];
  selectedPastBooking: Booking | undefined;
}

export const initialHealthRecordState: healthRecord = {
  pastBookings: [],
  selectedPastBooking: undefined,
};
