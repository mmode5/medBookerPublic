import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import {
  NbGlobalLogicalPosition,
  NbGlobalPhysicalPosition,
  NbToastrService,
} from '@nebular/theme';
import { AuthService } from 'src/app/services/auth.service';
import { loginForm } from 'src/app/models/login.model';
import { passwordValidator } from 'src/app/models/password.validator';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  error: string | null = null;
  physicalPositions = NbGlobalPhysicalPosition;
  logicalPositions = NbGlobalLogicalPosition;

  form: FormGroup<loginForm> = this.buildForm();
  constructor(
    private fb: FormBuilder,
    private auth: AuthService,
    private router: Router,
    private toastrService: NbToastrService
  ) {}

  private buildForm() {
    return this.fb.group<loginForm>({
      email: this.fb.control('', [Validators.required, Validators.email]),
      password: this.fb.control('', [
        Validators.required,
        Validators.minLength(3),
        passwordValidator(),
      ]),
    });
  }

  handleSubmssion() {
    const email = this.form.value.email;
    const password = this.form.value.password;
    if (email && password) {
      this.auth.login(email, password).subscribe(
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
