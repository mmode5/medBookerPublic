import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { map, Observable } from 'rxjs';
import {
  Booking,
  BookingRequest,
  Entity,
  EntitySearchForm,
  RoleName,
} from 'src/app/models/entity.model';
import { AuthService } from 'src/app/services/auth.service';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store/states/app.states';
import * as PatientsAction from '../../store/actions/patients.action';
import {
  patientsList,
  selectedPatient,
} from 'src/app/store/selectors/patients.selector';
import { LoadingService } from 'src/app/services/loading.service';

@Component({
  selector: 'app-patients',
  templateUrl: './patients.component.html',
  styleUrls: ['./patients.component.scss'],
})
export class PatientsComponent {
  public searchForm: FormGroup<EntitySearchForm> = this.buildForm();
  public members$: Observable<Entity[]> | undefined =
    this.store.select(patientsList);
  public selectedMember$: Observable<Entity | undefined> | undefined =
    this.store.select(selectedPatient);
  public minDate: Date | undefined;
  public selectedDate: Date | undefined;
  public endDate: Date | undefined;
  public currentUser = this.auth.currentUser;
  public bookingRequest: BookingRequest | undefined;
  public loadingSpinner = this.loading.loading$;

  constructor(
    private fb: FormBuilder,
    private auth: AuthService,
    private store: Store<AppState>,
    private loading: LoadingService
  ) {}

  ngOnInit() {
    this.getAllMembers();
    this.listenToFormChanges();
    this.minDate = new Date();
  }

  public buildForm() {
    return this.fb.group({
      firstName: this.fb.control(''),
      lastName: this.fb.control(''),
    });
  }

  private listenToFormChanges() {
    this.searchForm.valueChanges
      .pipe(
        map((value) => {
          return this.store.dispatch(
            PatientsAction.searchPatients({ ...value })
          );
        })
      )
      .subscribe();
  }

  private getAllMembers() {
    this.store.dispatch(PatientsAction.loadPatients());
  }

  public selectMember(id: number) {
    this.store.dispatch(PatientsAction.selectPatient({ entityNo: id }));
  }

  public Book(member: Entity) {
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
            attendeeType: RoleName.DOCTOR,
            entity: this.currentUser,
            entityNo: this.currentUser.entityNo,
          },
          {
            attendeeType: RoleName.PATIENT,
            entity: member,
            entityNo: member.entityNo,
          },
        ],
        organiser: this.currentUser.entityNo,
        startDate: this.selectedDate.toISOString(),
        endDate: this.endDate.toISOString(),
      };

      this.store.dispatch(
        PatientsAction.bookPatient({ bookingRequest: this.bookingRequest })
      );
    }
  }

  ngOnDestroy() {
    this.store.dispatch(PatientsAction.clearSelectPatient());
  }
}
