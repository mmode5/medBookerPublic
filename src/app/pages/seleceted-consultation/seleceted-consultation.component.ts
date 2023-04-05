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
  selector: 'app-seleceted-consultation',
  templateUrl: './seleceted-consultation.component.html',
  styleUrls: ['./seleceted-consultation.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SelecetedConsultationComponent implements OnInit {
  public currentUser: Entity | undefined = this.authService.currentUser;
  public roles = Role;
  public patientInfo: Entity | undefined;
  public doctorInfo: Practitioner | undefined;
  public upcomingConsultation: boolean = false;
  public today: string | undefined;

  @Input() selectedBooking: Booking | undefined;
  @Output() bookingStatusChange = new EventEmitter();

  constructor(
    private authService: AuthService,
    private entityInfo: EntityInfoService
  ) {}
  ngOnInit() {
    this.today = new Date().toISOString();
    if (this.selectedBooking) {
      [this.patientInfo, this.doctorInfo] =
        this.entityInfo.getPatientAndDoctorInfo(this.selectedBooking.attendees);
      this.upcomingConsultation = this.today < this.selectedBooking?.startTime;
    }
  }

  public cancelBooking(id: number) {
    this.bookingStatusChange.emit([id, BookingStatus.CANCELLED]);
  }
}
