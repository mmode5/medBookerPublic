import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { NebularModule } from '../nebular/nebular.module';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatRadioModule } from '@angular/material/radio';
import { MatCardModule } from '@angular/material/card';
import { MatGridListModule } from '@angular/material/grid-list';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  imports: [
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
    MatRadioModule,
    MatCardModule,
    CommonModule,
    MatGridListModule,
    NebularModule,
    ReactiveFormsModule,
    FormsModule
  ],
  exports:[RegisterComponent, LoginComponent],
  declarations: [RegisterComponent, LoginComponent]
})
export class AuthModule { }
