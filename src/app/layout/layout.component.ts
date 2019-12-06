import { Component, OnInit } from '@angular/core';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { trigger, transition, style, animate } from '@angular/animations';
import { SettingsComponent } from './settings/settings.component';
import { EpubService } from '../shared/epub.service';
import { SettingsService } from '../shared/settings.service';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.sass'],
  animations: [
    trigger('fadeAnimation', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('0.1s ease-out', style({ opacity: 1 }))
      ]),
      transition(':leave', [
        style({ opacity: 1 }),
        animate('0.1s ease-in', style({ opacity: 0 }))
      ]),
    ]),
  ]
})
export class LayoutComponent implements OnInit {
  isBookOpened: boolean;
  isDarkMode: boolean;
  isHeaderHovered: boolean;

  constructor(
    private epubService: EpubService,
    private settingsService: SettingsService,
    private bottomSheet: MatBottomSheet,
  ) { }

  ngOnInit() {
    this.epubService.isBookOpened$.subscribe(isOpen => {
      this.isBookOpened = isOpen;
    });
    this.settingsService.theme$.subscribe(theme => {
      this.isDarkMode = (theme === 'dark');
    });
  }

  openSettings(): void {
    this.bottomSheet.open(SettingsComponent);
  }

  openEpubFile(event): void {
    const file = event.target.files[0];
    if (window.FileReader) {
      const fileReader = new FileReader();
      fileReader.onload = this.epubService.openBook;
      fileReader.readAsArrayBuffer(file);
    }
  }

  toggleDarkMode(): void {
    if (this.isDarkMode) {
      this.settingsService.changeTheme('default');
    } else {
      this.settingsService.changeTheme('dark');
    }
  }

}
