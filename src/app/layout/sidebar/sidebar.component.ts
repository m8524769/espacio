import { Component, OnInit, HostListener } from '@angular/core';

import { EpubService } from 'src/app/shared/epub.service';
import Navigation from 'epubjs/types/navigation';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.sass']
})
export class SidebarComponent implements OnInit {
  navigation: Navigation;
  currentHref: string;

  constructor(
    private epubService: EpubService
  ) { }

  ngOnInit() {
    this.epubService.book.loaded.navigation.then(navigation => {
      console.log(navigation)
      this.navigation = navigation;
    });
    this.epubService.currentSection$.subscribe(section => {
      console.log(section.href)
      this.currentHref = section.href;
    })
  }

  enterSection(href: string) {
    console.log(href);
    this.epubService.rendition.display(href);
  }

  prevChapter() {
    this.epubService.rendition.prev();
  }

  nextChapter() {
    this.epubService.rendition.next();
  }

}
