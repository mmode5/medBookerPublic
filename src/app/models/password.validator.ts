import { AbstractControl, ValidatorFn } from '@angular/forms';

export function passwordValidator(): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } | null => {
    const hasUppercase = /[A-Z]/.test(control.value);
    const hasLowercase = /[a-z]/.test(control.value);
    const hasNumber = /\d/.test(control.value);
    const hasSpecialCharacter = /[$&+,:;=?@#|'<>.^*()%!-]/.test(control.value);
    const isValid =
      hasUppercase && hasLowercase && hasNumber && hasSpecialCharacter;
    return isValid ? null : { invalidPassword: { value: control.value } };
  };
}
export function matchPasswordValidator(
  controlNameToCompare: string
): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } | null => {
    const controlToCompare = control.root.get(controlNameToCompare);
    if (controlToCompare) {
      const subscription = controlToCompare.valueChanges.subscribe(() => {
        control.updateValueAndValidity();
        subscription.unsubscribe();
      });
    }
    return controlToCompare && controlToCompare.value !== control.value
      ? { matchPassword: true }
      : null;
  };
}
