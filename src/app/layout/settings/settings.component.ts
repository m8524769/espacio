import { Component, OnInit } from '@angular/core';
import { SettingsService } from 'src/app/shared/settings.service';

interface Option {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.sass']
})
export class SettingsComponent implements OnInit {

  themeOptions: Option[] = [
    { value: 'default', viewValue: 'Default' },
    { value: 'dark', viewValue: 'Dark' },
  ];

  fontFamilyOptions: Option[] = [
    { value: 'inherit', viewValue: 'Default' },
    { value: 'serif', viewValue: 'Serif' },
    { value: 'sans-serif', viewValue: 'Sans-serif' },
    { value: 'monospace', viewValue: 'Monospace' },
    { value: 'system-ui', viewValue: 'System UI' },
  ];

  fontSizeOptions: Option[] = [
    { value: 'medium', viewValue: 'Default' },
    { value: '10px', viewValue: '10px' },
    { value: '12px', viewValue: '12px' },
    { value: '14px', viewValue: '14px' },
    { value: '16px', viewValue: '16px' },
    { value: '18px', viewValue: '18px' },
    { value: '20px', viewValue: '20px' },
    { value: '22px', viewValue: '22px' },
    { value: '24px', viewValue: '24px' },
    { value: '26px', viewValue: '26px' },
    { value: '28px', viewValue: '28px' },
  ];

  fontWeightOptions: Option[] = [
    { value: 'normal', viewValue: 'Default' },
    { value: '100', viewValue: 'Thin' },
    { value: '200', viewValue: 'Extra-Light' },
    { value: '300', viewValue: 'Light' },
    { value: '400', viewValue: 'Regular' },
    { value: '500', viewValue: 'Medium' },
    { value: '600', viewValue: 'Semi-Bold' },
    { value: '700', viewValue: 'Bold' },
    { value: '800', viewValue: 'Extra-Bold' },
    { value: '900', viewValue: 'Black' },
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

  changeDropCaps(dropCaps: string) {
    this.settingsService.changeDropCaps(dropCaps);
  }
}
