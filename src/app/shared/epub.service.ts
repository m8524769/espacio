import { Injectable } from '@angular/core';
import ePub, { Book, Rendition } from 'epubjs';

@Injectable({
  providedIn: 'root'
})
export class EpubService {
  book: Book;
  rendition: Rendition;

  constructor() {
    this.loadBook('../../assets/Kubernetes_in_Action.epub');
    // this.loadBook('../../assets/thekubernetesbook.epub');
  }

  loadBook(path: string): object {
    this.book = ePub(path);
    return this.book.loaded;
  }
}
