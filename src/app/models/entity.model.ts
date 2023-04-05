import { FormControl } from '@angular/forms';

export enum Role {
  PATIENT = 1000000001,
  DOCTOR = 1100000111,
}

export enum RoleName {
  PATIENT = 'PATIENT',
  DOCTOR = 'PROVIDER',
}

export enum BookingStatus {
  CONFIRMED = 'CONFIRMED',
  TENTATIVE = 'TENTATIVE',
  DECLINED = 'DECLINED',
  CANCELLED = 'CANCELLED',
}

export interface Entity {
  entityNo: number;
  firstName: string;
  lastName: string;
}

export interface Practitioner extends Entity {
  practiceName?: string;
  practiceNo?: string;
}

export interface Attendee {
  attendeeType: RoleName;
  entity: Entity;
  entityNo: number;
}

export interface Booking {
  attendees: Attendee[];
  description?: string;
  endTime: string;
  id: number;
  startTime: string;
  status: BookingStatus;
  statusComment?: string;
  title: string;
}

export interface BookingRequest {
  attendees: Attendee[];
  description?: string;
  endDate: string;
  id?: number;
  organiser: number;
  startDate: string;
  title?: string;
}

export interface BookingResponse {
  bookingMap: Record<string, Booking[]>;
  endTime: string;
  startTime: string;
}

export interface BookingStatusUpdateRequest {
  bookingStatus: BookingStatus;
  comment?: string;
  includeDependent: true;
}

export interface EntitySearchForm {
  firstName: FormControl<string | null>;
  lastName: FormControl<string | null>;
}
