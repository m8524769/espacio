import { Component, OnInit, NgZone } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Location } from 'epubjs/types/rendition';
import Contents from 'epubjs/types/contents';
import Section from 'epubjs/types/section';

import { EpubService } from 'src/app/shared/epub.service';
import { SettingsService } from 'src/app/shared/settings.service';
import { ImageViewerComponent } from '../image-viewer/image-viewer.component';

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
    private zone: NgZone,
    public dialog: MatDialog,
  ) { }

  ngOnInit() {
    this.epubService.renderTo('viewer', {
      flow: 'scrolled-doc',
      width: '840px',
      height: 'calc(100vh - 128px)',
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

    // Store current book after displayed
    // this.epubService.rendition.once('displayed', () => {
    //   this.epubService.storeCurrentBook();
    // });

    // Change default style of epub-container
    this.epubService.rendition.once('rendered', () => {
      this.epubContainer = document.getElementsByClassName('epub-container')[0] as HTMLElement;
      this.epubContainer.style.padding = '64px calc(50vw - 420px)';
    });

    // Set Style
    // Theme
    this.settingsService.theme$.subscribe(theme => {
      this.epubService.rendition.themes.register(theme, './assets/themes.css');
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
    // Drop-Caps
    this.epubService.rendition.hooks.content.register((content: Contents) => {
      this.settingsService.dropCaps$.subscribe((dropCaps: string) => {
        if (Number(dropCaps) > 1) {
          const dropCapsPercentage = `${Number(dropCaps) * 100}%`;
          content.addStylesheetRules({
            'p:first-of-type:first-letter': {
              'float': 'left',
              'text-transform': 'capitalize',
              'font-size': dropCapsPercentage,
              'line-height': '0.75em',
              'padding-right': '0.05em',
              'margin-top': '-0.07em'
            }
          });
        } else {  // Reset drop caps
          content.addStylesheetRules({
            'p:first-of-type:first-letter': {
              'float': 'none',
              'text-transform': 'none',
              'font-size': 'inherit',
              'line-height': 'inherit',
              'padding-right': '0',
              'margin-top': '0'
            }
          });
        }
      });
    });

    // Default Style
    this.epubService.rendition.themes.default({
      'a': {
        'color': '#ff4081'
      },
      '::selection': {
        'background-color': '#d5d5d5'
      },
      'img': {
        'cursor': 'zoom-in'
      }
    });

    this.epubService.rendition.on('relocated', (location: Location) => {
      this.epubService.updateCurrentLocation(location);
    });

    this.epubService.rendition.on('rendered', (section: Section) => {
      this.epubService.updateCurrentSection(section);

      // Update current navItem by section
      const navItem = this.epubService.book.navigation.get(section.href);
      this.epubService.updateCurrentNavItem(navItem);

      // Listen to the pointer location in the rendition
      const docElement = this.epubService.rendition.getContents()[0].documentElement as HTMLElement;
      docElement.addEventListener('mouseup', event => {
        const offsetX = this.epubContainer.firstElementChild.getBoundingClientRect().left;  // epub-view
        const offsetY = this.epubContainer.scrollTop;
        this.clientX = event.clientX + offsetX;
        this.clientY = event.clientY - offsetY + 64;  // Height of header is 64px
      });

      // Make <iframe> over the highlight <svg>
      const iframe = this.epubContainer.firstElementChild.firstElementChild as HTMLElement;
      iframe.style.position = 'absolute';
      iframe.style.zIndex = '1';

      // Add click event listener to all images
      const images = docElement.getElementsByTagName('img');
      for (let i = 0; i < images.length; ++i) {
        const image = images.item(i);
        image.addEventListener('click', event => {
          this.zone.run(() => {
            this.dialog.open(ImageViewerComponent, {
              data: { imageElement: event.target as HTMLImageElement }
            });
          });
        });
      }
    });

    this.epubService.rendition.on('selected', (cfirange: string, contents: Contents) => {
      // Copy the selected content from the <iframe> to an outside element
      const epubSelection: Selection = contents.window.getSelection();
      const agent: HTMLElement = document.getElementById('epubSelection');
      agent.innerText = epubSelection.toString();

      // Clean any current selection
      const selection: Selection = window.getSelection();
      selection.removeAllRanges();

      // Select the outside element
      const range: Range = new Range();
      range.selectNodeContents(agent);
      selection.addRange(range);

      // Trigger a mouseup event manually
      agent.dispatchEvent(new MouseEvent('mouseup', {
        bubbles: true,
        cancelable: true,
        clientX: this.clientX,
        clientY: this.clientY,
      }));

      // Highlight
      // this.epubService.rendition.annotations.highlight(
      //   cfirange,
      //   {},
      //   (event: MouseEvent) => {
      //     console.log(event);
      //   },
      //   null,
      //   {
      //     'fill': '#ffaacc', // pink
      //     // 'fill': '#ffe680', // yellow
      //     'fill-opacity': '0.6',
      //   }
      // );
      // contents.window.getSelection().removeAllRanges();
    });
  }

}
