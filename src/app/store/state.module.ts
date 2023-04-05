import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { reducers } from './reducers';
import { environment } from 'src/envirements/envirement';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { EffectsModule } from '@ngrx/effects';
import { healthRecordEffects } from './effects/healthRecord.effect';
import { requestedBookingEffects } from './effects/requestedBookings.effect';
import { upcomingConsultationEffects } from './effects/upcomingConsultatios.effect';
import { practitionersEffects } from './effects/practitioners.effect';
import { patientEffects } from './effects/patients.effetct';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    StoreModule.forRoot(reducers),
    EffectsModule.forRoot([
      healthRecordEffects,
      requestedBookingEffects,
      upcomingConsultationEffects,
      practitionersEffects,
      patientEffects,
    ]),
    StoreDevtoolsModule.instrument({
      name: 'medBooker',
      maxAge: 25,
      logOnly: environment.production,
    }),
  ],
})
export class StateModule {}
