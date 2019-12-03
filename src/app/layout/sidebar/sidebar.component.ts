import { Component, OnInit, HostListener } from '@angular/core';

import { EpubService } from 'src/app/shared/epub.service';
import Navigation, { NavItem } from 'epubjs/types/navigation';
import Section, { SpineItem } from 'epubjs/types/section';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.sass']
})
export class SidebarComponent implements OnInit {
  navigation: Navigation;
  spine: SpineItem[];
  currentSection: Section;
  currentNavItem: NavItem;

  constructor(
    private epubService: EpubService
  ) { }

  ngOnInit() {
    this.epubService.book.loaded.navigation.then(navigation => {
      console.log(navigation)
      this.navigation = navigation;
    });
    this.epubService.book.loaded.spine.then(spine => {
      console.log(spine)
      this.spine = spine;
    });
    this.epubService.currentSection$.subscribe(section => {
      console.log(section)
      this.currentSection = section;
    });
    this.epubService.currentNavItem$.subscribe(navItem => {
      console.log(navItem)
      this.currentNavItem = navItem;
    });
  }

  enterSection(navItem: NavItem) {
    this.epubService.rendition.display(navItem.href);
    this.epubService.updateCurrentNavItem(navItem);
  }

  prevChapter() {
    this.epubService.rendition.prev();
  }

  nextChapter() {
    this.epubService.rendition.next();
  }

}
