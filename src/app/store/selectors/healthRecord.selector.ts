import { createFeatureSelector, createSelector } from '@ngrx/store';
import { healthRecord } from '../states/health-record.state';

const selecetHealthRecordSate =
  createFeatureSelector<healthRecord>('healthRecord');

export const selectPastBooking = createSelector(
  selecetHealthRecordSate,
  (state) => state.pastBookings
);

export const getSelectedtBooking = createSelector(
  selecetHealthRecordSate,
  (state) => state.selectedPastBooking
);
