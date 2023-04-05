import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import {
  Booking,
  BookingStatus,
  Entity,
  Practitioner,
  Role,
} from 'src/app/models/entity.model';
import { AuthService } from 'src/app/services/auth.service';

import { EntityInfoService } from 'src/app/services/entity-info.service';

@Component({
  selector: 'app-single-consultation',
  templateUrl: './single-consultation.component.html',
  styleUrls: ['./single-consultation.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SingleConsultationComponent implements OnInit {
  public currentUser: Entity | undefined = this.authService.currentUser;
  public roles = Role;
  public patientInfo: Entity | undefined;
  public doctorInfo: Practitioner | undefined;
  public perviusConsultation: boolean = false;
  public today: string | undefined;

  @Input() booking: Booking | undefined;
  @Output() bookingStatusChange = new EventEmitter();

  constructor(
    private authService: AuthService,
    private entityInfo: EntityInfoService
  ) {}

  ngOnInit(): void {
    this.today = new Date().toISOString();
    if (this.booking) {
      [this.patientInfo, this.doctorInfo] =
        this.entityInfo.getPatientAndDoctorInfo(this.booking.attendees);
      this.perviusConsultation = this.today > this.booking?.startTime;
    }
  }

  public acceptBooking(id: number) {
    this.bookingStatusChange.emit([id, BookingStatus.CONFIRMED]);
  }

  public cancelBooking(id: number) {
    this.bookingStatusChange.emit([id, BookingStatus.CANCELLED]);
  }
}
