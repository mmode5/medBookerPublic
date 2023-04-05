import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import {
  Booking,
  BookingStatus,
  Entity,
  Role,
  RoleName,
} from 'src/app/models/entity.model';
import { AuthService } from 'src/app/services/auth.service';
import * as RequestedBookingsAction from '../../store/actions/requestedBookings.actions';
import { selectRequestedBookings } from 'src/app/store/selectors/requestedBookings.selector';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store/states/app.states';
import { LoadingService } from 'src/app/services/loading.service';

@Component({
  selector: 'app-consultaiton-requests',
  templateUrl: './consultaiton-requests.component.html',
  styleUrls: ['./consultaiton-requests.component.scss'],
})
export class ConsultaitonRequestsComponent {
  public roles = Role;
  public currentUser: Entity | undefined = this.authService.currentUser;
  public bookingStatus = BookingStatus;
  public bookings$: Observable<Booking[]> | undefined = this.store.select(
    selectRequestedBookings
  );
  public RoleName = RoleName;
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
