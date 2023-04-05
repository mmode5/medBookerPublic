import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { Booking, BookingStatus, Entity } from 'src/app/models/entity.model';
import { AuthService } from 'src/app/services/auth.service';

import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store/states/app.states';
import * as UpcomingConsultationsActions from '../../store/actions/upcomingConsultations.action';
import {
  getSelectedtUpcomingBooking,
  selectUpcomingConsultations,
} from 'src/app/store/selectors/upcomingConsultations.selector';
import { LoadingService } from 'src/app/services/loading.service';

@Component({
  selector: 'app-upcoming-consultations',
  templateUrl: './upcoming-consultations.component.html',
  styleUrls: ['./upcoming-consultations.component.scss'],
})
export class UpcomingConsultationsComponent {
  public currentUser: Entity | undefined = this.authService.currentUser;
  public bookings$: Observable<Booking[]> | undefined;
  public selectedBooking$: Observable<Booking | undefined> = this.store.select(
    getSelectedtUpcomingBooking
  );
  public loadingSpinner = this.loading.loading$;

  constructor(
    private authService: AuthService,
    private store: Store<AppState>,
    private loading: LoadingService
  ) {}

  ngOnInit(): void {
    this.getAllBookings();
    this.listenBookings();
  }

  public refreshBookings(e: [number, BookingStatus]) {
    const [id, status] = e;

    this.store.dispatch(
      UpcomingConsultationsActions.updateUpcomingBookingStatus({ id, status })
    );
  }

  public getAllBookings() {
    if (this.currentUser?.entityNo) {
      this.store.dispatch(
        UpcomingConsultationsActions.loadUpcomingBookings({
          entityNo: this.currentUser?.entityNo,
        })
      );
    }
  }

  public onBookingClick(booking: Booking) {
    this.store.dispatch(
      UpcomingConsultationsActions.selectUpcomingBooking({ booking: booking })
    );
  }

  public listenBookings() {
    this.bookings$ = this.store.select(selectUpcomingConsultations);
  }

  public identity(index: number, bookingUsed: Booking): number {
    return bookingUsed.id;
  }

  ngOnDestroy() {
    this.store.dispatch(UpcomingConsultationsActions.clearUpcomingBooking());
  }
}
