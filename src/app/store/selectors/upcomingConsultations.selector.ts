import { createFeatureSelector, createSelector } from '@ngrx/store';
import { upcomingConsultations } from '../states/upcomingConsultations.state';

const selecetUpcomingConsultationsSate =
  createFeatureSelector<upcomingConsultations>('upcomingConsultations');

export const selectUpcomingConsultations = createSelector(
  selecetUpcomingConsultationsSate,
  (state) => state.upcomingConsultations
);

export const getSelectedtUpcomingBooking = createSelector(
  selecetUpcomingConsultationsSate,
  (state) => state.selectedUpcomingBooking
);
