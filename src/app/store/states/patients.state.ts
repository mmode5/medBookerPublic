import { Entity } from 'src/app/models/entity.model';

export interface patients {
  patients: Entity[];
  selectedPatient: Entity | undefined;
}

export const initialPatients: patients = {
  patients: [],
  selectedPatient: undefined,
};
