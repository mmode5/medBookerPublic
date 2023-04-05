import {
  Booking,
  BookingResponse,
  Practitioner,
  RoleName,
} from '../models/entity.model';

export function mergeData(booking: Booking, doctors: Practitioner[]) {
  return {
    ...booking,
    attendees: booking.attendees?.map((a) => {
      if (a.attendeeType == RoleName.DOCTOR && a.entityNo) {
        const doctor = doctors.find((d) => d.entityNo == a.entityNo);
        if (doctor) {
          return { ...a, entity: doctor };
        }
      }
      return a;
    }),
  };
}

export function getEntityNumbers(bookings: Booking[]) {
  return bookings.map(
    (e) => e.attendees?.find((a) => a.attendeeType == RoleName.DOCTOR)?.entityNo
  );
}

export function flattenBookings(response: BookingResponse) {
  if (response?.bookingMap) return Object.values(response.bookingMap).flat();
  return [];
}
