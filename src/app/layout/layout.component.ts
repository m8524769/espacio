import { Component, OnInit } from '@angular/core';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { SettingsComponent } from './settings/settings.component';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.sass']
})
export class LayoutComponent implements OnInit {

  constructor(
    private bottomSheet: MatBottomSheet,
  ) { }

  ngOnInit() {
  }

  openSettings(): void {
    this.bottomSheet.open(SettingsComponent);
  }

}
