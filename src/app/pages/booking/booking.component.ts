import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';

import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import {
  BookingRequest,
  Practitioner,
  RoleName,
} from 'src/app/models/entity.model';
import { AuthService } from 'src/app/services/auth.service';
import { selectedPractitioner } from 'src/app/store/selectors/practitioners.selector';
import { AppState } from 'src/app/store/states/app.states';
import * as PractitionerActions from '../../store/actions/practitioners.actions';

@Component({
  selector: 'app-booking',
  templateUrl: './booking.component.html',
  styleUrls: ['./booking.component.scss'],
})
export class BookingComponent implements OnInit {
  public practitioners$: Observable<Practitioner | undefined> | undefined =
    this.store.select(selectedPractitioner);
  public selectedDate: Date | undefined;
  public endDate: Date | undefined;
  public minDate: Date | undefined;
  public bookingRequest: BookingRequest | undefined;
  public currentUser = this.auth.currentUser;

  constructor(
    private route: ActivatedRoute,
    private auth: AuthService,
    private store: Store<AppState>
  ) {}

  ngOnInit() {
    this.retrievePractitionerData();
    this.minDate = new Date();
  }

  public retrievePractitionerData() {
    const entityNo = Number(this.route.snapshot.params['id']);
    this.store.dispatch(
      PractitionerActions.selectPractitioner({ entityNo: entityNo })
    );
  }

  public Book(practitioner: Practitioner) {
    if (this.selectedDate)
      this.endDate = new Date(this.selectedDate.getTime() + 30 * 60000);
    if (
      this.currentUser &&
      this.currentUser.entityNo &&
      this.selectedDate &&
      this.endDate
    ) {
      this.bookingRequest = {
        attendees: [
          {
            attendeeType: RoleName.PATIENT,
            entity: this.currentUser,
            entityNo: this.currentUser.entityNo,
          },
          {
            attendeeType: RoleName.DOCTOR,
            entity: practitioner,
            entityNo: practitioner.entityNo,
          },
        ],
        organiser: this.currentUser.entityNo,
        startDate: this.selectedDate.toISOString(),
        endDate: this.endDate.toISOString(),
      };

      this.store.dispatch(
        PractitionerActions.bookPractitioner({
          bookingRequest: this.bookingRequest,
        })
      );
    }
  }

  ngOnDestroy() {
    this.store.dispatch(PractitionerActions.clearSelectedPractitioner());
  }
}
