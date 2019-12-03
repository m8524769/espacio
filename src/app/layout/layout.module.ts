import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {
  MatSidenavModule,
  MatToolbarModule,
  MatExpansionModule,
  MatIconModule,
  MatListModule,
  MatButtonModule,
  MatMenuModule,
  MatDividerModule,
  MatTooltipModule,
  MatCardModule,
  MatBottomSheetModule,
  MatInputModule,
  MatSelectModule,
} from '@angular/material';

import { LayoutComponent } from './layout.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { ContainerComponent } from './container/container.component';
import { SettingsComponent } from './settings/settings.component';

@NgModule({
  declarations: [
    LayoutComponent,
    SidebarComponent,
    ContainerComponent,
    SettingsComponent,
  ],
  imports: [
    CommonModule,
    MatSidenavModule,
    MatToolbarModule,
    MatExpansionModule,
    MatIconModule,
    MatListModule,
    MatButtonModule,
    MatMenuModule,
    MatDividerModule,
    MatTooltipModule,
    MatCardModule,
    MatBottomSheetModule,
    MatInputModule,
    MatSelectModule,
  ]
})
export class LayoutModule { }
