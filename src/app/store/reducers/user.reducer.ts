import { createReducer, on } from '@ngrx/store';
import * as UserActions from '../actions/user.actions';
import { initialUser } from '../states/user.state';

export const UserReducer = createReducer(
  initialUser,
  on(
    UserActions.loadUser,
    (state, action):any => {
      return {
        ...state,
        user: action.user,
      };
    }
  ),
);
