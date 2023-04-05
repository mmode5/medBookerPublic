import { Booking } from 'src/app/models/entity.model';

export interface requestedBookings {
  requestedBookings: Booking[];
}

export const initialRequestedBookingsState: requestedBookings = {
  requestedBookings: [],
};
