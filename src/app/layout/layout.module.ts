import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatBottomSheetModule } from '@angular/material/bottom-sheet';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { MatSelectModule } from '@angular/material/select';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

import { LayoutComponent } from './layout.component';
import { LibraryComponent } from './library/library.component';
import { ContentsComponent } from './contents/contents.component';
import { ContainerComponent } from './container/container.component';
import { SettingsComponent } from './settings/settings.component';
import { DropZoneComponent } from './drop-zone/drop-zone.component';
import { ImageViewerComponent } from './image-viewer/image-viewer.component';
import { FileDropDirective } from '../common/file-drop.directive';
import { SafePipe } from '../common/safe.pipe';

@NgModule({
  declarations: [
    LayoutComponent,
    LibraryComponent,
    ContentsComponent,
    ContainerComponent,
    SettingsComponent,
    DropZoneComponent,
    ImageViewerComponent,
    FileDropDirective,
    SafePipe,
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
    MatDialogModule,
    MatBottomSheetModule,
    MatInputModule,
    MatSelectModule,
    MatAutocompleteModule,
    MatProgressSpinnerModule,
  ]
})
export class LayoutModule { }
