import { Component, OnInit } from '@angular/core';
import { SettingsService } from 'src/app/shared/settings.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.sass']
})
export class SettingsComponent implements OnInit {

  themes: object[] = [
    {
      value: 'default',
      label: 'Default'
    },
    {
      value: 'dark',
      label: 'Dark'
    },
  ];

  constructor(
    public settingsService: SettingsService,
  ) { }

  ngOnInit() { }

  changeTheme(theme: string) {
    this.settingsService.changeTheme(theme);
  }

  changeFontFamily(fontFamily: string) {
    this.settingsService.changeFontFamily(fontFamily);
  }

  changeFontSize(fontSize: string) {
    this.settingsService.changeFontSize(fontSize);
  }

  changeFontWeight(fontWeight: string) {
    this.settingsService.changeFontWeight(fontWeight);
  }

  changeLineHeight(lineHeight: string) {
    this.settingsService.changeLineHeight(lineHeight);
  }

  changeLetterSpacing(letterSpacing: string) {
    this.settingsService.changeLetterSpacing(letterSpacing);
  }

  changeFontSizeAdjust(fontSizeAdjust: string) {
    this.settingsService.changeFontSizeAdjust(fontSizeAdjust);
  }
}
