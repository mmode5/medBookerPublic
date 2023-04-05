import { NgModule } from '@angular/core';

import {
  NbAlertModule,
  NbButtonModule,
  NbCardModule,
  NbFormFieldModule,
  NbIconModule,
  NbInputModule,
  NbLayoutModule,
  NbListModule,
  NbRadioModule,
  NbSelectModule,
  NbSpinnerModule,
  NbUserModule,
} from '@nebular/theme';
import { NbEvaIconsModule } from '@nebular/eva-icons';

const nebularComponents = [
  NbLayoutModule,
  NbEvaIconsModule,
  NbIconModule,
  NbButtonModule,
  NbCardModule,
  NbInputModule,
  NbFormFieldModule,
  NbAlertModule,
  NbSelectModule,
  NbUserModule,
  NbSpinnerModule,
  NbListModule,
  NbRadioModule,
];

@NgModule({
  declarations: [],
  exports: [nebularComponents],
})
export class NebularModule {}
