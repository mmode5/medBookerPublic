import { createReducer, on } from '@ngrx/store';
import * as PatientsAction from '../actions/patients.action';
import { initialPatients, patients } from '../states/patients.state';

export const patientsReducer = createReducer(
  initialPatients,
  on(PatientsAction.loadPatientsSuccess, (state, action): patients => {
    return {
      ...state,
      patients: action.patients,
    };
  }),
  on(PatientsAction.loadPatientsFailure, (state): patients => {
    return {
      ...state,
      patients: [],
    };
  }),
  on(PatientsAction.searchPatientsSuccess, (state, action): patients => {
    return {
      ...state,
      patients: action.patients,
    };
  }),
  on(PatientsAction.searchPatientsFailure, (state): patients => {
    return {
      ...state,
      patients: [],
    };
  }),
  on(PatientsAction.selectPatientSuccess, (state, action): patients => {
    return {
      ...state,
      selectedPatient: action.patient,
    };
  }),
  on(PatientsAction.selectPatientFailure, (state): patients => {
    return {
      ...state,
      selectedPatient: undefined,
    };
  }),
  on(PatientsAction.clearSelectPatient, (state): patients => {
    return {
      ...state,
      selectedPatient: undefined,
    };
  }),
  on(PatientsAction.bookPatientSuccess, (state): patients => {
    return {
      ...state,
      selectedPatient: undefined,
    };
  })
);
