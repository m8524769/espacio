import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { trigger, transition, style, animate } from '@angular/animations';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { NavItem } from 'epubjs/types/navigation';
import { SettingsComponent } from './settings/settings.component';
import { EpubService } from '../shared/epub.service';
import { SettingsService } from '../shared/settings.service';
import { ApiService } from '../shared/api.service';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.sass'],
  animations: [
    trigger('fadeAnimation', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('0.1s ease-out', style({ opacity: 1 })),
      ]),
      transition(':leave', [
        style({ opacity: 1 }),
        animate('0.1s ease-in', style({ opacity: 0 })),
      ]),
    ]),
  ],
})
export class LayoutComponent implements OnInit, OnDestroy {
  currentNavItem: NavItem;
  isBookOpened: boolean = false;
  isDarkMode: boolean = false;
  isHeaderHovered: boolean = false;

  destroyed$: Subject<void> = new Subject();

  constructor(
    private epubService: EpubService,
    private settingsService: SettingsService,
    private bottomSheet: MatBottomSheet,
    private api: ApiService,
  ) { }

  ngOnInit(): void {
    this.api.getDate().subscribe(console.log);

    this.epubService.isBookOpened$.subscribe(() => {
      this.isBookOpened = true;
    });

    this.epubService.currentNavItem$.pipe(
      takeUntil(this.destroyed$),
    ).subscribe(navItem => {
      this.currentNavItem = navItem;
    });

    this.settingsService.theme$.pipe(
      takeUntil(this.destroyed$),
    ).subscribe(theme => {
      this.isDarkMode = (theme === 'dark');
    });
  }

  ngOnDestroy(): void {
    this.destroyed$.next();
    this.destroyed$.complete();
  }

  toggleDarkMode(): void {
    if (this.isDarkMode) {
      this.settingsService.changeTheme('light');
    } else {
      this.settingsService.changeTheme('dark');
    }
  }

  openSettings(): void {
    this.bottomSheet.open(SettingsComponent);
  }
}
