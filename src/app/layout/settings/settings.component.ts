import { Component, OnInit } from '@angular/core';
import { SettingsService, ThemeType } from 'src/app/shared/settings.service';

interface Option {
  value: string;
  displayValue: string;
}

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.sass'],
})
export class SettingsComponent implements OnInit {

  themeOptions: Option[] = [
    { value: 'light', displayValue: 'Light' },
    { value: 'dark', displayValue: 'Dark' },
  ];

  fontFamilyOptions: Option[] = [
    { value: 'inherit', displayValue: 'Default' },
    { value: 'serif', displayValue: 'Serif' },
    { value: 'sans-serif', displayValue: 'Sans-serif' },
    { value: 'monospace', displayValue: 'Monospace' },
    { value: 'system-ui', displayValue: 'System UI' },
  ];

  fontSizeOptions: Option[] = [
    { value: 'medium', displayValue: 'Default' },
    { value: '10px', displayValue: '10px' },
    { value: '12px', displayValue: '12px' },
    { value: '14px', displayValue: '14px' },
    { value: '16px', displayValue: '16px' },
    { value: '18px', displayValue: '18px' },
    { value: '20px', displayValue: '20px' },
    { value: '22px', displayValue: '22px' },
    { value: '24px', displayValue: '24px' },
    { value: '26px', displayValue: '26px' },
    { value: '28px', displayValue: '28px' },
  ];

  fontWeightOptions: Option[] = [
    { value: 'normal', displayValue: 'Default' },
    { value: '100', displayValue: 'Thin' },
    { value: '200', displayValue: 'Extra-Light' },
    { value: '300', displayValue: 'Light' },
    { value: '400', displayValue: 'Regular' },
    { value: '500', displayValue: 'Medium' },
    { value: '600', displayValue: 'Semi-Bold' },
    { value: '700', displayValue: 'Bold' },
    { value: '800', displayValue: 'Extra-Bold' },
    { value: '900', displayValue: 'Black' },
  ];

  constructor(
    public settingsService: SettingsService,
  ) { }

  ngOnInit() { }

  changeTheme(theme: ThemeType): void {
    this.settingsService.changeTheme(theme);
  }

  changeFontFamily(fontFamily: string): void {
    this.settingsService.changeFontFamily(fontFamily);
  }

  changeFontSize(fontSize: string): void {
    this.settingsService.changeFontSize(fontSize);
  }

  changeFontWeight(fontWeight: string): void {
    this.settingsService.changeFontWeight(fontWeight);
  }

  changeLineHeight(lineHeight: string): void {
    this.settingsService.changeLineHeight(lineHeight);
  }

  changeLetterSpacing(letterSpacing: string): void {
    this.settingsService.changeLetterSpacing(letterSpacing);
  }

  changeFontSizeAdjust(fontSizeAdjust: string): void {
    this.settingsService.changeFontSizeAdjust(fontSizeAdjust);
  }

  changeDropCaps(dropCaps: string): void {
    this.settingsService.changeDropCaps(dropCaps);
  }
}
