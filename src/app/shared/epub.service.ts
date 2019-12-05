import { Injectable } from '@angular/core';
import ePub, { Book, Rendition } from 'epubjs';
import Section, { SpineItem } from 'epubjs/types/section';
import { Subject, from } from 'rxjs';
import Navigation, { NavItem } from 'epubjs/types/navigation';
import Spine from 'epubjs/types/spine';
import { PackagingMetadataObject } from 'epubjs/types/packaging';

@Injectable({
  providedIn: 'root'
})
export class EpubService {
  book: Book;
  rendition: Rendition;
  readonly currentSection$: Subject<Section> = new Subject();
  readonly currentNavItem$: Subject<NavItem> = new Subject();
  readonly currentLocation$: Subject<Location> = new Subject();

  readonly metadata$: Subject<PackagingMetadataObject> = new Subject();
  readonly navigation$: Subject<Navigation> = new Subject();
  readonly spine$: Subject<SpineItem[]> = new Subject();

  constructor() {
    this.book = ePub('../../assets/thekubernetesbook.epub');
    // this.book = ePub('../../assets/Kubernetes_in_Action.epub');
    // this.book = ePub('../../assets/valentin-hauy.epub');

    from(this.book.loaded.metadata).subscribe(metadata => {
      this.metadata$.next(metadata);
    });
    from(this.book.loaded.navigation).subscribe(navigation => {
      this.navigation$.next(navigation);
    });
    from(this.book.loaded.spine).subscribe(spine => {
      this.spine$.next(spine);
    });
  }

  openBook(event) {
    // this.book = ePub();
    // this.book.openEpub(event.target.result);
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
