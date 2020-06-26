import { Injectable } from '@angular/core';
import ePub, { Book, Rendition } from 'epubjs';
import Section from 'epubjs/types/section';
import Spine from 'epubjs/types/spine';
import { Subject, from, BehaviorSubject } from 'rxjs';
import Navigation, { NavItem } from 'epubjs/types/navigation';
import { PackagingMetadataObject } from 'epubjs/types/packaging';
import { RenditionOptions, Location } from 'epubjs/types/rendition';

@Injectable({
  providedIn: 'root'
})
export class EpubService {
  readonly book: Book = ePub();
  readonly fileName$: Subject<string> = new Subject();
  readonly isBookOpened$: BehaviorSubject<boolean> = new BehaviorSubject(false);
  readonly isBookReady$: BehaviorSubject<boolean> = new BehaviorSubject(false);

  rendition: Rendition;
  readonly currentSection$: Subject<Section> = new Subject();
  readonly currentNavItem$: Subject<NavItem> = new Subject();
  readonly currentLocation$: Subject<Location> = new Subject();

  readonly metadata$: Subject<PackagingMetadataObject> = new Subject();
  readonly navigation$: Subject<Navigation> = new Subject();
  readonly spine$: Subject<Spine> = new Subject();

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
      // console.log('Spine loaded', this.book.spine);  // Wrong type
      this.spine$.next(this.book.spine);
    });
  }

  openBook(input: any, what?: string) {
    this.book.open(input, what);
  }

  display(target?: string) {
    this.rendition.display(target);
  }

  storeCurrentBook(force?: boolean) {
    this.book
      .store('espacio')
      .add(this.book.resources, force).then(() => {
        // console.log('stored');
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
    localStorage.setItem(`${this.book.key()}-last`, location.start.cfi);
  }
}
