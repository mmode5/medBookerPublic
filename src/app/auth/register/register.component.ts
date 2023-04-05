import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { Role } from 'src/app/models/entity.model';
import {
  matchPasswordValidator,
  passwordValidator,
} from 'src/app/models/password.validator';
import { registrationForm } from 'src/app/models/registration.model';
import { NbGlobalPhysicalPosition, NbToastrService } from '@nebular/theme';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent {
  role = Role;
  error: string | null = null;

  form: FormGroup<registrationForm> = this.buildForm();
  constructor(
    private fb: FormBuilder,
    private auth: AuthService,
    private router: Router,
    private toastrService: NbToastrService
  ) {}

  private buildForm() {
    return this.fb.group<registrationForm>({
      firstName: this.fb.control('', [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(20),
      ]),
      lastName: this.fb.control('', [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(20),
      ]),
      email: this.fb.control('', [Validators.required, Validators.email]),
      password: this.fb.control('', [
        Validators.required,
        Validators.minLength(6),
        passwordValidator(),
      ]),
      confirmPassword: this.fb.control('', [
        Validators.required,
        matchPasswordValidator('password'),
      ]),
      role: this.fb.control(null, [Validators.required]),
    });
  }

  handleSubmssion() {
    const email = this.form.value.email;
    const password = this.form.value.password;
    const firstname = this.form.value.firstName;
    const lastname = this.form.value.lastName;
    const roleId = this.form.value.role;
    const displayName = {
      entityNo: roleId,
      firstName: firstname,
      lastName: lastname,
    };

    if (email && password && roleId && firstname && lastname && displayName) {
      this.auth.register(email, password, displayName).subscribe(
        (x) => {
          this.toastrService.success(
            'You have successfully logged in.',
            'Success',
            {
              position: NbGlobalPhysicalPosition.TOP_RIGHT,
              duration: 2000,
            }
          );
          setTimeout(() => {
            this.router.navigate(['/dashboard']);
          }, 2000);
        },
        (error) => {
          this.error = error.message;
          this.toastrService.danger(this.error, 'Error', {
            position: NbGlobalPhysicalPosition.TOP_RIGHT,
            duration: 2000,
          });
        }
      );
    }
  }
}
