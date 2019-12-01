import { Component, OnInit } from '@angular/core';

import { EpubService } from 'src/app/shared/epub.service';
import Navigation from 'epubjs/types/navigation';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.sass']
})
export class SidebarComponent implements OnInit {
  navigation: Navigation;

  constructor(
    private epubService: EpubService
  ) {
    epubService.book.loaded.navigation.then(navigation => {
      console.log(navigation)
      this.navigation = navigation;
    });
  }

  ngOnInit() {
  }

  enterChapter(href: string) {
    console.log(href);
    this.epubService.rendition.display(href);
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
