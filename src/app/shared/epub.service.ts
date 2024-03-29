import { Injectable } from '@angular/core';
import ePub, { Book, Rendition } from 'epubjs';
import Section from 'epubjs/types/section';
import Spine from 'epubjs/types/spine';
import { Subject, from, Observable, defer, BehaviorSubject } from 'rxjs';
import Navigation, { NavItem } from 'epubjs/types/navigation';
import { PackagingMetadataObject } from 'epubjs/types/packaging';
import { RenditionOptions, Location } from 'epubjs/types/rendition';

@Injectable({
  providedIn: 'root',
})
export class EpubService {
  readonly book: Book = ePub();
  readonly fileName$: Subject<string> = new Subject();
  readonly isBookOpened$: Observable<Book>;

  readonly isBookLoading$: Observable<boolean>;
  private _isBookLoading$: BehaviorSubject<boolean> = new BehaviorSubject(false);

  rendition: Rendition;
  readonly currentSection$: Subject<Section> = new Subject();
  readonly currentNavItem$: Subject<NavItem> = new Subject();
  readonly currentLocation$: Subject<Location> = new Subject();

  readonly metadata$: Subject<PackagingMetadataObject> = new Subject();
  readonly navigation$: Subject<Navigation> = new Subject();
  readonly spine$: Subject<Spine> = new Subject();
  readonly coverImg$: Subject<string> = new Subject();

  constructor() {
    this.isBookOpened$ = defer(() => this.book.opened);
    this.isBookLoading$ = this._isBookLoading$.asObservable();

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
    from(this.book.loaded.cover).subscribe(coverUrl => {
      if (!coverUrl) {
        this.coverImg$.next('assets/icons/icon-128x128.png');
        return;
      }
      this.book.archive.createUrl(coverUrl, { base64: true })
        .then(img => this.coverImg$.next(img));
    });
  }

  openBook(input: any, what?: string): void {
    this.book.open(input, what);
  }

  display(target?: string): void {
    this.rendition.display(target);
  }

  renderTo(element: string, options: RenditionOptions): void {
    this.rendition = this.book.renderTo(element, options);
  }

  updateBookLoading(isLoading: boolean): void {
    this._isBookLoading$.next(isLoading);
  }

  updateCurrentSection(section: Section): void {
    this.currentSection$.next(section);
  }

  updateCurrentNavItem(navItem: NavItem): void {
    this.currentNavItem$.next(navItem);
  }

  updateCurrentLocation(location: Location): void {
    this.currentLocation$.next(location);
    localStorage.setItem(`${this.book.key()}-last`, location.start.cfi);
  }
}
