import { Injectable } from '@angular/core';
import ePub, { Book, Rendition } from 'epubjs';
import Section from 'epubjs/types/section';
import { Subject } from 'rxjs';
import { NavItem } from 'epubjs/types/navigation';

@Injectable({
  providedIn: 'root'
})
export class EpubService {
  book: Book;
  rendition: Rendition;
  currentSection$: Subject<Section>;
  currentNavItem$: Subject<NavItem>;
  currentLocation$: Subject<Location>;

  constructor() {
    // this.loadBook('../../assets/Kubernetes_in_Action.epub');
    this.loadBook('../../assets/thekubernetesbook.epub');
    // this.loadBook('../../assets/valentin-hauy.epub');
    this.currentSection$ = new Subject();
    this.currentNavItem$ = new Subject();
    this.currentLocation$ = new Subject();
  }

  loadBook(path: string): Book {
    this.book = ePub(path);
    return this.book;
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
