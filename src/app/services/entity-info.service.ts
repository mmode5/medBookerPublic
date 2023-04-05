import { Injectable } from '@angular/core';
import { Attendee, Entity, Practitioner } from '../models/entity.model';

@Injectable({
  providedIn: 'root',
})
export class EntityInfoService {
  constructor() {}

  getPatientAndDoctorInfo(
    attendees: Attendee[]
  ): [Entity | undefined, Practitioner | undefined] {
    let patientInfo: Entity | undefined = undefined;
    let doctorInfo: Practitioner | undefined = undefined;

    for (let item of attendees) {
      if (item.attendeeType === 'PATIENT') {
        patientInfo = item.entity;
      } else {
        doctorInfo = item.entity;
      }
    }

    return [patientInfo, doctorInfo];
  }
}
