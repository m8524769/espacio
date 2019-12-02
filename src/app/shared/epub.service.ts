import { Injectable } from '@angular/core';
import ePub, { Book, Rendition } from 'epubjs';
import Section from 'epubjs/types/section';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EpubService {
  book: Book;
  rendition: Rendition;
  currentSection$: Subject<Section>;

  constructor() {
    // this.loadBook('../../assets/Kubernetes_in_Action.epub');
    // this.loadBook('../../assets/thekubernetesbook.epub');
    this.loadBook('../../assets/valentin-hauy.epub');
    this.currentSection$ = new Subject();
  }

  loadBook(path: string): Book {
    this.book = ePub(path);
    return this.book;
  }

  updateCurrentSection(section: Section) {
    this.currentSection$.next(section);
  }
}
