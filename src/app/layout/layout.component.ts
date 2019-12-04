import { Component, OnInit } from '@angular/core';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { SettingsComponent } from './settings/settings.component';
import { EpubService } from '../shared/epub.service';
import { SettingsService } from '../shared/settings.service';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.sass']
})
export class LayoutComponent implements OnInit {
  isDarkMode: boolean;

  constructor(
    private epubService: EpubService,
    private settingsService: SettingsService,
    private bottomSheet: MatBottomSheet,
  ) { }

  ngOnInit() {
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
