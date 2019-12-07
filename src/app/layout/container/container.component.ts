import { Component, OnInit, ElementRef } from '@angular/core';

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
    private elementRef: ElementRef<Element>,
  ) { }

  scrollRendition(event: WheelEvent) {
    // this.elementRef.nativeElement.firstElementChild.firstElementChild.scrollBy({
    //   top: event.deltaY,
    // });
  }

  ngOnInit() {
    this.epubService.renderTo('viewer', {
      flow: 'scrolled-doc',
      width: '64rem',
      height: '92vh',
    });

    // Display last/initial page
    const lastLocation = localStorage.getItem(`${this.epubService.book.key()}-last`);
    if (lastLocation) {
      this.epubService.rendition.display(lastLocation);
    } else {
      this.epubService.book.loaded.navigation.then(navigation => {
        this.epubService.rendition.display(navigation.toc[0].href);
      });
    }

    // Change default style on epub-container
    this.epubService.rendition.once('rendered', () => {
      const epubContainer = document.getElementsByClassName('epub-container')[0] as HTMLElement;
      epubContainer.style.padding = '0 50vw';
    });

    // Set Style
    // Theme
    this.settingsService.theme$.subscribe(theme => {
      this.epubService.rendition.themes.register(theme, '/assets/themes.css');
      this.epubService.rendition.themes.select(theme);
    });
    // Font-Family
    this.settingsService.fontFamily$.subscribe(fontFamily => {
      this.epubService.rendition.themes.font(fontFamily);
    });
    // Font-Size
    this.settingsService.fontSize$.subscribe(fontSize => {
      this.epubService.rendition.themes.fontSize(fontSize);
    });
    // Font-Width
    this.settingsService.fontWeight$.subscribe(fontWeight => {
      this.epubService.rendition.themes.override('font-weight', fontWeight);
    });
    // Line-Height
    this.settingsService.lineHeight$.subscribe(lineHeight => {
      this.epubService.rendition.themes.override('line-height', lineHeight);
    });
    // Page-Width Todo
    this.settingsService.pageWidth$.subscribe(pageWidth => {})

    this.epubService.rendition.on('relocated', location => {
      this.epubService.updateCurrentLocation(location);
    });

    this.epubService.rendition.on('rendered', section => {
      this.epubService.updateCurrentSection(section);

      const navItem = this.epubService.book.navigation.get(section.href);
      if (navItem && navItem.href === section.href) {
        this.epubService.updateCurrentNavItem(navItem);
      }
    });
  }

}
