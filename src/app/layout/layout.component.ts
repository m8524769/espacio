import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { trigger, transition, style, animate } from '@angular/animations';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { NavItem } from 'epubjs/types/navigation';
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

  componentDestroyed$: Subject<void> = new Subject();

  constructor(
    private epubService: EpubService,
    private settingsService: SettingsService,
    private bottomSheet: MatBottomSheet,
  ) { }

  ngOnInit(): void {
    this.epubService.isBookOpened$.subscribe(() => {
      this.isBookOpened = true;
    });

    this.epubService.currentNavItem$.pipe(
      takeUntil(this.componentDestroyed$),
    ).subscribe(navItem => {
      this.currentNavItem = navItem;
    });

    this.settingsService.theme$.pipe(
      takeUntil(this.componentDestroyed$),
    ).subscribe(theme => {
      this.isDarkMode = (theme === 'dark');
    });
  }

  ngOnDestroy(): void {
    this.componentDestroyed$.next();
    this.componentDestroyed$.complete();
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
