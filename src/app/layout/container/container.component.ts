import { Component, OnInit } from '@angular/core';

import { EpubService } from 'src/app/shared/epub.service';
import { SettingsService } from 'src/app/shared/settings.service';

@Component({
  selector: 'app-container',
  templateUrl: './container.component.html',
  styleUrls: ['./container.component.sass']
})
export class ContainerComponent implements OnInit {

  constructor(
    private epubService: EpubService,
    private settingsService: SettingsService,
  ) { }

  ngOnInit() {
    this.epubService.rendition = this.epubService.book.renderTo('viewer', {
      flow: 'scrolled-doc',
      width: '64rem',
      height: '92vh',

      // flow: 'paginated',
      // width: '96rem',
      // height: '92vh',
    });

    // Set Style
    // Font-Family
    this.settingsService.fontFamily$.subscribe(fontFamily => {
      this.epubService.rendition.themes.font(fontFamily);
    });
    // Font-Size
    this.settingsService.fontSize$.subscribe(fontSize => {
      this.epubService.rendition.themes.fontSize(fontSize);
    });
    // Theme
    this.settingsService.theme$.subscribe(theme => {
      this.epubService.rendition.themes.register(theme, '/assets/themes.css');
      this.epubService.rendition.themes.select(theme);
    });

    // Display initial page
    this.epubService.book.loaded.navigation.then(navigation => {
      this.epubService.rendition.display(navigation.toc[0].href);
    });

    this.epubService.rendition.on('relocated', location => {
      this.epubService.updateCurrentLocation(location);
    });

    this.epubService.rendition.on('rendered', section => {
      this.epubService.updateCurrentSection(section);

      const navItem = this.epubService.book.navigation.get(section.href)
      if (navItem && navItem.href === section.href) {
        this.epubService.updateCurrentNavItem(navItem);
      }
    });
  }

}
