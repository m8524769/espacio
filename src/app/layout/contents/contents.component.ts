import { Component, OnInit } from '@angular/core';

import { EpubService } from 'src/app/shared/epub.service';
import Navigation, { NavItem } from 'epubjs/types/navigation';
import Section from 'epubjs/types/section';
import Spine from 'epubjs/types/spine';

@Component({
  selector: 'app-contents',
  templateUrl: './contents.component.html',
  styleUrls: ['./contents.component.sass'],
})
export class ContentsComponent implements OnInit {
  navigation: Navigation;
  spine: Spine;
  currentSection: Section;
  currentNavItem: NavItem;

  constructor(
    private epubService: EpubService,
  ) { }

  ngOnInit(): void {
    this.epubService.navigation$.subscribe(navigation => this.navigation = navigation);
    this.epubService.spine$.subscribe(spine => this.spine = spine);
    this.epubService.currentSection$.subscribe(section => this.currentSection = section);
    this.epubService.currentNavItem$.subscribe(navItem => this.currentNavItem = navItem);
  }

  enterSection(navItem: NavItem): void {
    this.epubService.display(navItem.href);
  }

  prevChapter(): void {
    this.epubService.rendition.prev();
  }

  nextChapter(): void {
    this.epubService.rendition.next();
  }

  hasSubItems(navItem: NavItem): boolean {
    return navItem.subitems.length > 0;
  }

  isCurrentNavItem(navItem: NavItem): boolean {
    if (!this.currentNavItem) {
      return false;
    }
    return (
      navItem.id === this.currentNavItem.id ||
      navItem.id === this.currentNavItem.parent ||
      navItem.href === this.currentNavItem.href ||
      navItem.href === this.currentNavItem.parent
    );
  }
}
