import { createReducer, on } from '@ngrx/store';
import * as DoctorsActions from '../actions/practitioners.actions';
import {
  practitioners,
  initialPractitioners,
} from '../states/practitioners.state';

export const practitionersReducer = createReducer(
  initialPractitioners,
  on(
    DoctorsActions.loadPractitionersSuccess,
    (state, action): practitioners => {
      return {
        ...state,
        practitioners: action.practitioners,
      };
    }
  ),
  on(DoctorsActions.loadPractitionersFailure, (state): practitioners => {
    return {
      ...state,
      practitioners: [],
    };
  }),
  on(
    DoctorsActions.searchPractitionersSuccess,
    (state, action): practitioners => {
      return {
        ...state,
        practitioners: action.practitioners,
      };
    }
  ),
  on(DoctorsActions.searchPractitionersFailure, (state): practitioners => {
    return {
      ...state,
      practitioners: [],
    };
  }),
  on(
    DoctorsActions.selectPractitionerSuccess,
    (state, action): practitioners => {
      return {
        ...state,
        selectedPractitioner: action.practitioner,
      };
    }
  ),
  on(DoctorsActions.selectPractitionersFailure, (state): practitioners => {
    return {
      ...state,
      selectedPractitioner: undefined,
    };
  }),
  on(DoctorsActions.clearSelectedPractitioner, (state): practitioners => {
    return {
      ...state,
      selectedPractitioner: undefined,
    };
  })
);
