import { createFeatureSelector, createSelector } from '@ngrx/store';
import { practitioners } from '../states/practitioners.state';

const selectPractitioners =
  createFeatureSelector<practitioners>('practitioners');

export const practitionersList = createSelector(
  selectPractitioners,
  (state) => state.practitioners
);

export const selectedPractitioner = createSelector(
  selectPractitioners,
  (state) => state.selectedPractitioner
);
