import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface Settings {
  theme?: string;
  fontFamily?: string;
  fontSize?: string;
  fontWeight?: string;
  lineHeight?: string;
  pageWidth?: string;
}

@Injectable({
  providedIn: 'root'
})
export class SettingsService {
  theme$: BehaviorSubject<string>;
  fontFamily$: BehaviorSubject<string>;
  fontSize$: BehaviorSubject<string>;
  fontWeight$: BehaviorSubject<string>;
  lineHeight$: BehaviorSubject<string>;
  pageWidth$: BehaviorSubject<string>;

  constructor() {
    // Todo: Load local settings
    const userSettings: Settings = {
      theme: 'dark',
      fontFamily: "'Crimson Pro', serif",
      fontSize: '20px',
    };

    const defaultSettings: Settings = {
      theme: 'default',
      fontFamily: 'inherit',
      fontSize: 'medium',
      fontWeight: 'normal',
      lineHeight: 'normal',
      pageWidth: '64rem',
    };

    this.initializeSettings(
      Object.assign(defaultSettings, userSettings)
    );
  }

  initializeSettings(settings: Settings) {
    this.theme$ = new BehaviorSubject(settings.theme);
    this.fontFamily$ = new BehaviorSubject(settings.fontFamily);
    this.fontSize$ = new BehaviorSubject(settings.fontSize);
    this.fontWeight$ = new BehaviorSubject(settings.fontWeight);
    this.lineHeight$ = new BehaviorSubject(settings.lineHeight);
    this.pageWidth$ = new BehaviorSubject(settings.pageWidth);
  }

  changeTheme(theme: string) {
    this.theme$.next(theme);
  }

  changeFontFamily(fontFamily: string) {
    this.fontFamily$.next(fontFamily);
  }

  changeFontSize(fontSize: string) {
    this.fontSize$.next(fontSize);
  }

  changeFontWeight(fontWeight: string) {
    this.fontWeight$.next(fontWeight);
  }

  changeLineHeight(lineHeight: string) {
    this.lineHeight$.next(lineHeight);
  }

  changePageWidth(pageWidth) {
    this.pageWidth$.next(pageWidth);
  }
}
