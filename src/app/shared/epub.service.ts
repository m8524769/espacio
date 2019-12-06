import { Injectable } from '@angular/core';
import ePub, { Book, Rendition } from 'epubjs';
import Section, { SpineItem } from 'epubjs/types/section';
import { Subject, from, BehaviorSubject } from 'rxjs';
import Navigation, { NavItem } from 'epubjs/types/navigation';
import { PackagingMetadataObject } from 'epubjs/types/packaging';
import { RenditionOptions } from 'epubjs/types/rendition';

@Injectable({
  providedIn: 'root'
})
export class EpubService {
  readonly book: Book = ePub();
  readonly isBookOpened$: BehaviorSubject<boolean> = new BehaviorSubject(false);
  readonly isBookReady$: BehaviorSubject<boolean> = new BehaviorSubject(false);

  rendition: Rendition;
  readonly currentSection$: Subject<Section> = new Subject();
  readonly currentNavItem$: Subject<NavItem> = new Subject();
  readonly currentLocation$: Subject<Location> = new Subject();

  readonly metadata$: Subject<PackagingMetadataObject> = new Subject();
  readonly navigation$: Subject<Navigation> = new Subject();
  readonly spine$: Subject<SpineItem[]> = new Subject();

  constructor() {
    from(this.book.opened).subscribe(book => {
      this.isBookOpened$.next(book.isOpen);
    });
    from(this.book.loaded.metadata).subscribe(metadata => {
      // console.log('Metadata loaded', metadata);
      this.metadata$.next(metadata);
    });
    from(this.book.loaded.navigation).subscribe(navigation => {
      // console.log('Navigation loaded', navigation);
      this.navigation$.next(navigation);
    });
    from(this.book.loaded.spine).subscribe(spine => {
      // console.log('Spine loaded', spine);
      this.spine$.next(spine);
    });
  }

  openBook(event) {
    this.book.open(event.target.result, 'binary').then(() => {
      // console.log('Book loaded');
    });
  }

  renderTo(element: string, options: RenditionOptions) {
    this.rendition = this.book.renderTo(element, options);
  }

  updateCurrentSection(section: Section) {
    this.currentSection$.next(section);
  }

  updateCurrentNavItem(navItem: NavItem) {
    this.currentNavItem$.next(navItem);
  }

  updateCurrentLocation(location: Location) {
    this.currentLocation$.next(location);
  }
}
