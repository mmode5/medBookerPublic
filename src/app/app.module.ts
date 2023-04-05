import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AngularFireModule } from '@angular/fire/compat';
import { environment } from 'src/envirements/envirement';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { NebularModule } from './nebular/nebular.module';
import { ShellModule } from './shell/shell.module';
import {
  NbMenuModule,
  NbSidebarModule,
  NbThemeModule,
  NbToastrModule,
  NbTimepickerModule,
  NbDatepickerModule,
} from '@nebular/theme';
import { HomePageComponent } from './home-page/home-page.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { SearchComponent } from './pages/search/search.component';
import { BookingComponent } from './pages/booking/booking.component';
import { UpcomingConsultationsComponent } from './pages/upcoming-consultations/upcoming-consultations.component';
import { HealthRecordsComponent } from './pages/health-records/health-records.component';
import { ConsultaitonRequestsComponent } from './pages/consultaiton-requests/consultaiton-requests.component';
import { PatientsComponent } from './pages/patients/patients.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { API_BASE } from './models/tokens';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatRadioModule } from '@angular/material/radio';
import { MatCardModule } from '@angular/material/card';
import { CommonModule } from '@angular/common';
import { MatGridListModule } from '@angular/material/grid-list';
import { AuthModule } from './auth/auth.module';
import { MapComponent } from './pages/search/map/map.component';
import { SingleConsultationComponent } from './pages/single-consultation/single-consultation.component';
import { SelecetedConsultationComponent } from './pages/seleceted-consultation/seleceted-consultation.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { StateModule } from './store/state.module';
import { LoadingInterceptor } from './interceptors/loading.interceptor';

@NgModule({
  declarations: [
    AppComponent,
    HomePageComponent,
    DashboardComponent,
    SearchComponent,
    BookingComponent,
    UpcomingConsultationsComponent,
    HealthRecordsComponent,
    ConsultaitonRequestsComponent,
    PatientsComponent,
    MapComponent,
    SingleConsultationComponent,
    SelecetedConsultationComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    BrowserAnimationsModule,
    MatSlideToggleModule,
    ShellModule,
    NebularModule,
    NbThemeModule.forRoot(),
    NbSidebarModule.forRoot(),
    NbMenuModule.forRoot(),
    NbToastrModule.forRoot(),
    NbDatepickerModule.forRoot(),
    NbTimepickerModule.forRoot(),
    ReactiveFormsModule,
    HttpClientModule,
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
    MatRadioModule,
    MatCardModule,
    CommonModule,
    MatGridListModule,
    AuthModule,
    FormsModule,
    MatProgressSpinnerModule,
    StateModule,
  ],
  providers: [
    {
      provide: API_BASE,
      useValue: environment.apiBase,
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: LoadingInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
