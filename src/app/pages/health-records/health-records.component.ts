import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Booking, Entity } from 'src/app/models/entity.model';
import { AuthService } from 'src/app/services/auth.service';
import { LoadingService } from 'src/app/services/loading.service';
import {
  getSelectedtBooking,
  selectPastBooking,
} from 'src/app/store/selectors/healthRecord.selector';
import { AppState } from 'src/app/store/states/app.states';
import * as HealthRecordActions from '../../store/actions/healthRecord.actions';

@Component({
  selector: 'app-health-records',
  templateUrl: './health-records.component.html',
  styleUrls: ['./health-records.component.scss'],
})
export class HealthRecordsComponent {
  public currentUser: Entity | undefined = this.authService.currentUser;
  public bookings$: Observable<Booking[]> | undefined;
  public selectedBooking$: Observable<Booking | undefined> =
    this.store.select(getSelectedtBooking);
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
  public listenBookings() {
    this.bookings$ = this.store.select(selectPastBooking);
  }
  public getAllBookings() {
    if (this.currentUser?.entityNo) {
      this.store.dispatch(
        HealthRecordActions.loadPastBookings({
          entityNo: this.currentUser?.entityNo,
        })
      );
    }
  }

  public identity(index: number, bookingUsed: Booking): number {
    return bookingUsed.id;
  }

  public onBookingClick(booking: Booking) {
    this.store.dispatch(
      HealthRecordActions.selectPastBooking({ booking: booking })
    );
  }

  ngOnDestroy() {
    this.store.dispatch(HealthRecordActions.clearPastBooking());
  }
}
