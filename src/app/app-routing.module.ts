import { NgModule } from '@angular/core';
import { RouterModule, Routes, CanActivate } from '@angular/router';
import { HomePageComponent } from './home-page/home-page.component';
import { BookingComponent } from './pages/booking/booking.component';
import { ConsultaitonRequestsComponent } from './pages/consultaiton-requests/consultaiton-requests.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { HealthRecordsComponent } from './pages/health-records/health-records.component';
import { LoginComponent } from './auth/login/login.component';
import { PatientsComponent } from './pages/patients/patients.component';
import { RegisterComponent } from './auth/register/register.component';
import { SearchComponent } from './pages/search/search.component';
import { UpcomingConsultationsComponent } from './pages/upcoming-consultations/upcoming-consultations.component';
import { MainComponent } from './shell/main/main.component';
import { RegistrationGuard } from './guards/registration.guard';
import { AuthGuard } from './guards/auth.guard';
import { PatientGuard } from './guards/patient.guard';
import { DoctorGuard } from './guards/doctor.guard';
import { UsernameResolver } from './guards/username.resolver';

const routes: Routes = [
  {
    path: 'homepage',
    component: HomePageComponent,
    canActivate: [RegistrationGuard],
  },
  { path: '', redirectTo: 'homepage', pathMatch: 'full' },
  {
    path: 'login',
    component: LoginComponent,
    canActivate: [RegistrationGuard],
  },
  {
    path: 'register',
    component: RegisterComponent,
    canActivate: [RegistrationGuard],
  },
  {
    path: '',
    component: MainComponent,
    resolve: { username: UsernameResolver },
    canActivate: [AuthGuard],
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      { path: 'dashboard', component: DashboardComponent },
      {
        path: 'search',
        component: SearchComponent,
        canActivate: [PatientGuard],
      },
      { path: 'booking/:id', component: BookingComponent },
      {
        path: 'upcomingConsultations',
        component: UpcomingConsultationsComponent,
      },
      {
        path: 'healthRecords',
        component: HealthRecordsComponent,
        canActivate: [PatientGuard],
      },
      {
        path: 'consultaitonRequests',
        component: ConsultaitonRequestsComponent,
        canActivate: [DoctorGuard],
      },
      {
        path: 'patients',
        component: PatientsComponent,
        canActivate: [DoctorGuard],
      },
    ],
  },
  { path: '**', redirectTo: '' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
