import { createFeatureSelector, createSelector } from '@ngrx/store';

import { patients } from '../states/patients.state';

const selectPatients = createFeatureSelector<patients>('patients');

export const patientsList = createSelector(
  selectPatients,
  (state) => state.patients
);

export const selectedPatient = createSelector(
  selectPatients,
  (state) => state.selectedPatient
);
