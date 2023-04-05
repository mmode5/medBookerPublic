import { Practitioner } from 'src/app/models/entity.model';

export interface practitioners {
  practitioners: Practitioner[];
  selectedPractitioner: Practitioner | undefined;
}

export const initialPractitioners: practitioners = {
  practitioners: [],
  selectedPractitioner: undefined,
};
