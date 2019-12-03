import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface Settings {
  theme?: string;
  fontFamily?: string;
  fontSize?: string;
  pageWidth?: string;
}

@Injectable({
  providedIn: 'root'
})
export class SettingsService {
  theme$: BehaviorSubject<string>;
  fontFamily$: BehaviorSubject<string>;
  fontSize$: BehaviorSubject<string>;
  pageWidth$: BehaviorSubject<string>;

  constructor() {
    // Todo: Load local settings
    const userSettings: Settings = {
      fontFamily: "'Crimson Pro', serif",
      fontSize: '20px',
    };

    const defaultSettings: Settings = {
      theme: 'default',
      fontFamily: 'inherit',
      fontSize: 'inherit',
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

  changePageWidth(pageWidth) {
    this.pageWidth$.next(pageWidth);
  }
}
