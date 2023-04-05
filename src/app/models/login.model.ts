import { FormControl } from '@angular/forms';

export interface loginForm {
  email: FormControl<string | null>;
  password: FormControl<string | null>;
}
