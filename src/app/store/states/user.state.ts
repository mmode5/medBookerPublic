import {Entity} from '../../models/entity.model'

export interface User {
  user: Entity | null | undefined;
}

export const initialUser: User = {
  user: null
};
