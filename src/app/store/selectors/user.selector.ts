import { createFeatureSelector, createSelector } from '@ngrx/store';
import { User } from '../states/user.state';

const userState =
  createFeatureSelector<User>('user');

export const getUser = createSelector(
    userState,
  (state) => state.user
);