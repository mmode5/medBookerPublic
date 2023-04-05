import { createAction, props } from '@ngrx/store';
import { Entity } from '../../models/entity.model';

export const loadUser = createAction(
    '[API] load user',
    props<{ user: Entity  }>()
  );

