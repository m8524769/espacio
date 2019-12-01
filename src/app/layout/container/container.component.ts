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
  ) {
    epubService.rendition = epubService.book.renderTo('viewer', {
      flow: 'scrolled-doc',
      width: '64rem',
    });

    epubService.book.loaded.navigation.then(navigation => {
      epubService.rendition.display(navigation.toc[0].href);
    })

    epubService.rendition.on('relocated', location => {
      // console.log(location);
    });

    // this.rendition.on('rendered', section => {
    //   const prevSection: Section = section.prev();
    //   const nextSection: Section = section.next();
    //   console.log(epubService.book.navigation)
    //   console.log(prevSection)
    //   console.log(epubService.book.spine)
    //   if (prevSection) {
    //     console.log(prevSection.href)
    //     this.prevNav = epubService.book.navigation.get(prevSection.href);
    //     this.prevNav = epubService.book.spine.get(prevSection.href);
    //   }
    //   if (nextSection) {
    //     console.log(section.next())
    //     this.nextNav = epubService.book.navigation.get(nextSection.href);
    //   }
    //   console.log(this.prevNav)
    //   console.log(this.nextNav)
    // })
  }

  ngOnInit() {
  }

}
