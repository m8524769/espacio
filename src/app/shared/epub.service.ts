import { Injectable } from '@angular/core';
import ePub, { Book, Rendition } from 'epubjs';
import Section, { SpineItem } from 'epubjs/types/section';
import { Subject, from, BehaviorSubject } from 'rxjs';
import Navigation, { NavItem } from 'epubjs/types/navigation';
import { PackagingMetadataObject } from 'epubjs/types/packaging';

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
    // this.book = ePub('../../assets/Kubernetes_in_Action.epub');
    // this.book = ePub('../../assets/valentin-hauy.epub');

    // this.book.open('../../assets/thekubernetesbook.epub').then(() => {
    //   console.log('Book loaded');
    // });
    from(this.book.opened).subscribe(book => {
      this.isBookOpened$.next(book.isOpen);
    });
    from(this.book.loaded.metadata).subscribe(metadata => {
      console.log('Metadata loaded', metadata);
      this.metadata$.next(metadata);
    });
    from(this.book.loaded.navigation).subscribe(navigation => {
      console.log('Navigation loaded', navigation);
      this.navigation$.next(navigation);
    });
    from(this.book.loaded.spine).subscribe(spine => {
      console.log('Spine loaded', spine);
      this.spine$.next(spine);
    });
    console.log(this.book)
  }

  openBook(event) {
    console.log(event.target.result);
    console.log(this.book)
    // this.book.open(event.target.result, "binary");
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
