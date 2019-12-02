import { Component, OnInit } from '@angular/core';

import { EpubService } from 'src/app/shared/epub.service';
import { Rendition } from 'epubjs';
import { NavItem } from 'epubjs/types/navigation';
import Section from 'epubjs/types/section';

@Component({
  selector: 'app-container',
  templateUrl: './container.component.html',
  styleUrls: ['./container.component.sass']
})
export class ContainerComponent implements OnInit {
  // prevNav: NavItem;
  // nextNav: NavItem;

  constructor(
    private epubService: EpubService
  ) { }

  ngOnInit() {
    this.epubService.rendition = this.epubService.book.renderTo('viewer', {
      // flow: 'scrolled-doc',
      // width: '64rem',

      flow: 'paginated',
      height: '92vh',
      width: '96rem',
    });

    this.epubService.book.loaded.navigation.then(navigation => {
      this.epubService.rendition.display(navigation.toc[0].href);
    })

    this.epubService.rendition.on('relocated', location => {
      // console.log(location);
    });

    this.epubService.rendition.on('rendered', section => {
      this.epubService.updateCurrentSection(section);

      // const prevSection: Section = section.prev();
      // const nextSection: Section = section.next();
      // console.log(epubService.book.navigation)
      // console.log(prevSection)
      // console.log(epubService.book.spine)
      // if (prevSection) {
      //   console.log(prevSection.href)
      //   this.prevNav = epubService.book.navigation.get(prevSection.href);
      //   this.prevNav = epubService.book.spine.get(prevSection.href);
      // }
      // if (nextSection) {
      //   console.log(section.next())
      //   this.nextNav = epubService.book.navigation.get(nextSection.href);
      // }
      // console.log(this.prevNav)
      // console.log(this.nextNav)
    })
  }

}
