import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import {
  Booking,
  BookingStatus,
  Entity,
  Role,
} from 'src/app/models/entity.model';

import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store/states/app.states';
import * as RequestedBookingsAction from '../../store/actions/requestedBookings.actions';
import { selectRequestedBookings } from 'src/app/store/selectors/requestedBookings.selector';
import { LoadingService } from 'src/app/services/loading.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  public bookings$: Observable<Booking[]> | undefined = this.store.select(
    selectRequestedBookings
  );
  public currentUser: Entity | undefined = this.authService.currentUser;
  public roles = Role;
  public loadingSpinner = this.loading.loading$;

  constructor(
    private authService: AuthService,
    private store: Store<AppState>,
    private loading: LoadingService
  ) {}

  ngOnInit() {
    this.getAllBookings();
    this.listenBookings();
  }

  public refreshBookings(e: [number, BookingStatus]) {
    const [id, status] = e;

    this.store.dispatch(
      RequestedBookingsAction.updateRequestedBookingStatus({ id, status })
    );
  }

  public getAllBookings() {
    if (this.currentUser?.entityNo) {
      this.store.dispatch(
        RequestedBookingsAction.loadRequestedBookings({
          entityNo: this.currentUser?.entityNo,
        })
      );
    }
  }
  public listenBookings() {
    this.bookings$ = this.store.select(selectRequestedBookings);
  }
  public identity(index: number, bookingUsed: Booking): number {
    return bookingUsed.id;
  }
}
