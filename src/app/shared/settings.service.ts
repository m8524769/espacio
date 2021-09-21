import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';

export type ThemeType = 'light' | 'dark';

@Injectable({
  providedIn: 'root',
})
export class SettingsService {
  readonly theme$: Observable<ThemeType>;
  readonly fontFamily$: Observable<string>;
  readonly fontSize$: Observable<string>;
  readonly fontWeight$: Observable<string>;
  readonly lineHeight$: Observable<string>;
  readonly pageWidth$: Observable<string>;
  readonly letterSpacing$: Observable<string>;
  readonly fontSizeAdjust$: Observable<string>;
  readonly dropCaps$: Observable<string>;

  private _theme$: BehaviorSubject<ThemeType>;
  private _fontFamily$: BehaviorSubject<string>;
  private _fontSize$: BehaviorSubject<string>;
  private _fontWeight$: BehaviorSubject<string>;
  private _lineHeight$: BehaviorSubject<string>;
  private _pageWidth$: BehaviorSubject<string>;
  private _letterSpacing$: BehaviorSubject<string>;
  private _fontSizeAdjust$: BehaviorSubject<string>;
  private _dropCaps$: BehaviorSubject<string>;

  constructor() {
    this._theme$ = new BehaviorSubject(localStorage.getItem('theme') as ThemeType ?? 'light');
    this.theme$ = this._theme$.asObservable();

    this._fontFamily$ = new BehaviorSubject(localStorage.getItem('fontFamily') ?? 'inherit');
    this.fontFamily$ = this._fontFamily$.asObservable();

    this._fontSize$ = new BehaviorSubject(localStorage.getItem('fontSize') ?? 'medium');
    this.fontSize$ = this._fontSize$.asObservable();

    this._fontWeight$ = new BehaviorSubject(localStorage.getItem('fontWeight') ?? 'normal');
    this.fontWeight$ = this._fontWeight$.asObservable();

    this._lineHeight$ = new BehaviorSubject(localStorage.getItem('lineHeight') ?? 'normal');
    this.lineHeight$ = this._lineHeight$.asObservable();

    this._pageWidth$ = new BehaviorSubject(localStorage.getItem('pageWidth') ?? '700px');
    this.pageWidth$ = this._pageWidth$.asObservable();

    this._letterSpacing$ = new BehaviorSubject(localStorage.getItem('letterSpacing') ?? 'normal');
    this.letterSpacing$ = this._letterSpacing$.asObservable();

    this._fontSizeAdjust$ = new BehaviorSubject(localStorage.getItem('fontSizeAdjust') ?? 'none');
    this.fontSizeAdjust$ = this._fontSizeAdjust$.asObservable();

    this._dropCaps$ = new BehaviorSubject(localStorage.getItem('dropCaps') ?? '1');
    this.dropCaps$ = this._dropCaps$.asObservable();
  }

  changeTheme(theme: ThemeType): void {
    this._theme$.next(theme);
    localStorage.setItem('theme', theme);
  }

  changeFontFamily(fontFamily: string): void {
    this._fontFamily$.next(fontFamily);
    localStorage.setItem('fontFamily', fontFamily);
  }

  changeFontSize(fontSize: string): void {
    this._fontSize$.next(fontSize);
    localStorage.setItem('fontSize', fontSize);
  }

  changeFontWeight(fontWeight: string): void {
    this._fontWeight$.next(fontWeight);
    localStorage.setItem('fontWeight', fontWeight);
  }

  changeLineHeight(lineHeight: string): void {
    this._lineHeight$.next(lineHeight);
    localStorage.setItem('lineHeight', lineHeight);
  }

  changePageWidth(pageWidth: string): void {
    this._pageWidth$.next(pageWidth);
    localStorage.setItem('pageWidth', pageWidth);
  }

  changeLetterSpacing(letterSpacing: string): void {
    this._letterSpacing$.next(letterSpacing);
    localStorage.setItem('letterSpacing', letterSpacing);
  }

  changeFontSizeAdjust(fontSizeAdjust: string): void {
    this._fontSizeAdjust$.next(fontSizeAdjust);
    localStorage.setItem('fontSizeAdjust', fontSizeAdjust);
  }

  changeDropCaps(dropCaps: string): void {
    this._dropCaps$.next(dropCaps);
    localStorage.setItem('dropCaps', dropCaps);
  }
}
