import { Component, OnInit } from '@angular/core';

import { EpubService } from 'src/app/shared/epub.service';
import { SettingsService } from 'src/app/shared/settings.service';

@Component({
  selector: 'app-container',
  templateUrl: './container.component.html',
  styleUrls: ['./container.component.sass']
})
export class ContainerComponent implements OnInit {
  epubContainer: HTMLElement;
  clientX: number = 0;
  clientY: number = 0;

  constructor(
    private epubService: EpubService,
    private settingsService: SettingsService,
  ) { }

  ngOnInit() {
    this.epubService.renderTo('viewer', {
      flow: 'scrolled-doc',
      width: '840px',
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

    // Change default style of epub-container
    this.epubService.rendition.once('rendered', () => {
      this.epubContainer = document.getElementsByClassName('epub-container')[0] as HTMLElement;
      this.epubContainer.style.padding = '0 calc(50vw - 420px)';
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
    // Letter-Spacing
    this.settingsService.letterSpacing$.subscribe(letterSpacing => {
      this.epubService.rendition.themes.override('letter-spacing', letterSpacing);
    });
    // Font-Size-Adjust
    this.settingsService.fontSizeAdjust$.subscribe(fontSizeAdjust => {
      this.epubService.rendition.themes.override('font-size-adjust', fontSizeAdjust);
    });

    this.epubService.rendition.on('relocated', location => {
      this.epubService.updateCurrentLocation(location);
    });

    this.epubService.rendition.on('rendered', section => {
      this.epubService.updateCurrentSection(section);

      const navItem = this.epubService.book.navigation.get(section.href);
      if (navItem && navItem.href === section.href) {
        this.epubService.updateCurrentNavItem(navItem);
      }

      // Listen to the pointer location in the rendition
      const docElement = this.epubService.rendition.getContents()[0].documentElement as HTMLElement;
      docElement.addEventListener('mouseup', event => {
        const offsetX = this.epubContainer.firstElementChild.getBoundingClientRect().left;  // epub-view
        const offsetY = this.epubContainer.scrollTop;
        this.clientX = event.clientX + offsetX;
        this.clientY = event.clientY - offsetY;
      });
    });

    this.epubService.rendition.on('selected', (cfirange, contents) => {
      // Copy the selected content from the <iframe> to an outside element
      const selection: Selection = contents.window.getSelection();
      const element: HTMLElement = document.getElementById('epubSelection');
      element.innerText = selection.toString();

      // Select the outside element
      const range: Range = document.createRange();
      range.selectNodeContents(element);
      window.getSelection().removeAllRanges();
      window.getSelection().addRange(range);

      // Trigger a mouseup event manually
      element.dispatchEvent(new MouseEvent('mouseup', {
        bubbles: true,
        cancelable: true,
        clientX: this.clientX,
        clientY: this.clientY,
      }));
    });
  }

}
