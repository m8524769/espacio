import { Component, OnInit } from '@angular/core';
import { SettingsService } from 'src/app/shared/settings.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.sass']
})
export class SettingsComponent implements OnInit {
  theme$: Observable<string>;
  fontFamily$: Observable<string>;
  fontSize$: Observable<string>;
  fontWeight$: Observable<string>;
  lineHeight$: Observable<string>;
  // pageWidth$: Observable<string>;

  constructor(
    private settingsService: SettingsService,
  ) { }

  ngOnInit() {
    this.theme$ = this.settingsService.theme$;
    this.fontFamily$ = this.settingsService.fontFamily$;
    this.fontSize$ = this.settingsService.fontSize$;
    this.fontWeight$ = this.settingsService.fontWeight$;
    this.lineHeight$ = this.settingsService.lineHeight$;
    // this.pageWidth$ = this.settingsService.pageWidth$;
  }

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

  // changePageWidth(pageWidth: string) {
  //   this.settingsService.changePageWidth(pageWidth);
  // }

}
