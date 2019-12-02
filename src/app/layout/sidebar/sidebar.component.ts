import { Component, OnInit, HostListener } from '@angular/core';

import { EpubService } from 'src/app/shared/epub.service';
import Navigation from 'epubjs/types/navigation';
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
    })
  }

  enterSection(href: string) {
    console.log(href);
    this.epubService.rendition.display(href);
    if (href.includes('#')) {
      // console.log('TODO')
    }
  }

  prevChapter() {
    this.epubService.rendition.prev();
  }

  nextChapter() {
    this.epubService.rendition.next();
  }

}
