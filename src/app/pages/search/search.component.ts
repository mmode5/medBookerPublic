import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Store } from '@ngrx/store';
import { debounceTime, map, Observable, switchMap, tap } from 'rxjs';
import {
  Booking,
  EntitySearchForm,
  Practitioner,
} from 'src/app/models/entity.model';
import { LoadingService } from 'src/app/services/loading.service';
import { practitionersList } from 'src/app/store/selectors/practitioners.selector';
import { AppState } from 'src/app/store/states/app.states';
import * as PractitionerActions from '../../store/actions/practitioners.actions';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
})
export class SearchComponent implements OnInit {
  public searchForm: FormGroup<EntitySearchForm> = this.buildForm();
  public practitioners$: Observable<Practitioner[]> | undefined =
    this.store.select(practitionersList);
  public loadingSpinner = this.loading.loading$;

  constructor(
    private fb: FormBuilder,
    private store: Store<AppState>,
    private loading: LoadingService
  ) {}
  public buildForm() {
    return this.fb.group({
      firstName: this.fb.control(''),
      lastName: this.fb.control(''),
    });
  }
  ngOnInit() {
    this.getAllPractitioners();
    this.listenToFormChanges();
  }

  private listenToFormChanges() {
    this.searchForm.valueChanges
      .pipe(
        map((value) => {
          return this.store.dispatch(
            PractitionerActions.searchPractitioners({ ...value })
          );
        })
      )
      .subscribe();
  }
  private getAllPractitioners() {
    this.store.dispatch(PractitionerActions.loadPractitioners());
  }
}
