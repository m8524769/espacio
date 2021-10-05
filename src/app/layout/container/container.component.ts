import { Component, OnInit, OnDestroy, NgZone } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Location } from 'epubjs/types/rendition';
import Contents from 'epubjs/types/contents';
import Section from 'epubjs/types/section';

import { EpubService } from 'src/app/shared/epub.service';
import { SettingsService } from 'src/app/shared/settings.service';
import { ImageViewerComponent } from '../image-viewer/image-viewer.component';

@Component({
  selector: 'app-container',
  templateUrl: './container.component.html',
  styleUrls: ['./container.component.sass'],
})
export class ContainerComponent implements OnInit, OnDestroy {
  epubContainer: HTMLElement;

  destroyed$: Subject<void> = new Subject();

  constructor(
    private epubService: EpubService,
    private settingsService: SettingsService,
    private zone: NgZone,
    public dialog: MatDialog,
  ) { }

  ngOnInit(): void {
    this.epubService.renderTo('viewer', {
      flow: 'scrolled-doc',
      width: '840px',
      height: 'calc(100vh - 128px)',
    });

    // Display last/initial page
    const lastLocation = localStorage.getItem(`${this.epubService.book.key()}-last`);
    if (lastLocation) {
      this.epubService.display(lastLocation);
    } else {
      this.epubService.display();
    }

    // Change default style of epub-container
    this.epubService.rendition.once('rendered', () => {
      this.epubContainer = document.getElementsByClassName('epub-container')[0] as HTMLElement;
      this.epubContainer.style.padding = '64px calc(50vw - 420px)';
    });

    // Set Style
    // Theme
    this.settingsService.theme$.pipe(
      takeUntil(this.destroyed$),
    ).subscribe(theme => {
      this.epubService.rendition.themes.register(theme, './assets/themes.css');
      this.epubService.rendition.themes.select(theme);
    });
    // Font-Family
    this.settingsService.fontFamily$.pipe(
      takeUntil(this.destroyed$),
    ).subscribe(fontFamily => {
      this.epubService.rendition.themes.font(fontFamily);
    });
    // Font-Size
    this.settingsService.fontSize$.pipe(
      takeUntil(this.destroyed$),
    ).subscribe(fontSize => {
      this.epubService.rendition.themes.fontSize(fontSize);
    });
    // Font-Width
    this.settingsService.fontWeight$.pipe(
      takeUntil(this.destroyed$),
    ).subscribe(fontWeight => {
      this.epubService.rendition.themes.override('font-weight', fontWeight);
    });
    // Line-Height
    this.settingsService.lineHeight$.pipe(
      takeUntil(this.destroyed$),
    ).subscribe(lineHeight => {
      this.epubService.rendition.themes.override('line-height', lineHeight);
    });
    // Letter-Spacing
    this.settingsService.letterSpacing$.pipe(
      takeUntil(this.destroyed$),
    ).subscribe(letterSpacing => {
      this.epubService.rendition.themes.override('letter-spacing', letterSpacing);
    });
    // Font-Size-Adjust
    this.settingsService.fontSizeAdjust$.pipe(
      takeUntil(this.destroyed$),
    ).subscribe(fontSizeAdjust => {
      this.epubService.rendition.themes.override('font-size-adjust', fontSizeAdjust);
    });
    // Drop-Caps
    this.epubService.rendition.hooks.content.register((content: Contents) => {
      this.settingsService.dropCaps$.pipe(
        takeUntil(this.destroyed$),
      ).subscribe(dropCaps => {
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
      },
      '.hypothesis-highlight': {
        'background-color': '#ffaacc99 !important',
        'transition': 'background-color 0.2s'
      },
      '.hypothesis-highlight:hover': {
        'background-color': '#ffaacccc !important'
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

      // Make <iframe> over the highlight <svg>
      const iframe = this.epubContainer.firstElementChild.firstElementChild as HTMLElement;
      iframe.style.position = 'absolute';
      iframe.style.zIndex = '1';

      // Add click event listener to all images
      const imageElements = docElement.getElementsByTagName('img');
      for (let i = 0; i < imageElements.length; ++i) {
        imageElements.item(i).addEventListener('click', event => {
          this.zone.run(() => {
            this.dialog.open(ImageViewerComponent, {
              data: { imageElement: event.target as HTMLImageElement }
            });
          });
        });
      }
    });
  }

  ngOnDestroy(): void {
    this.destroyed$.next();
    this.destroyed$.complete();
  }

}
