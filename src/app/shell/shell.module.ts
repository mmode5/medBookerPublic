import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainComponent } from './main/main.component';
import { HeaderComponent } from './header/header.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { NebularModule } from '../nebular/nebular.module';
import { RouterModule } from '@angular/router';
import { NbMenuModule, NbSidebarModule, NbThemeModule } from '@nebular/theme';

@NgModule({
  declarations: [MainComponent, HeaderComponent, SidebarComponent],
  imports: [
    CommonModule,
    NebularModule,
    RouterModule,
    NbThemeModule.forRoot(),
    NbSidebarModule.forRoot(),
    NbMenuModule.forRoot(),
  ],
  exports: [MainComponent, HeaderComponent, SidebarComponent],
})
export class ShellModule {}
