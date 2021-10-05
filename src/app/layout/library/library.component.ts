import { Component, OnDestroy, OnInit } from '@angular/core';
import { EpubService } from 'src/app/shared/epub.service';
import { Subject, zip } from 'rxjs';
import { map, takeUntil } from 'rxjs/operators';

const escapeRegExp = (str: string) => str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

@Component({
  selector: 'app-library',
  templateUrl: './library.component.html',
  styleUrls: ['./library.component.sass'],
})
export class LibraryComponent implements OnInit, OnDestroy {
  books: any[] = [];
  selected: boolean = false;
  searchTerm$: Subject<string> = new Subject();
  searchResults: any[] = [];

  destroy$: Subject<void> = new Subject();

  constructor(
    private epubService: EpubService,
  ) { }

  ngOnInit(): void {
    caches.open('espacio/library').then(cache => {
      cache.keys().then(keys => {
        Promise.all(keys.map(
          key => cache.match(key).then(response => response.json())
        )).then(books => {
          this.searchResults = this.books = books.reverse();
          this.searchTerm$.pipe(
            takeUntil(this.destroy$),
          ).subscribe(term => {
            this.searchResults = this.books.filter(book =>
              new RegExp(escapeRegExp(term), 'i').test(book.metadata.title)
            );
          });
        });
      });
    });

    // Cache new book's info
    zip(
      this.epubService.fileName$,
      this.epubService.metadata$,
      this.epubService.coverImg$,
    ).pipe(
      map(([fileName, metadata, coverImg]) => ({ fileName, metadata, coverImg })),
    ).subscribe(book => {
      const blob = new Blob([JSON.stringify(book, null, 2)]);
      caches.open('espacio/library').then(cache => {
        cache.put(book.metadata.title, new Response(blob, {
          status: 200,
          headers: new Headers({
            'Content-Type': 'application/json',
          }),
        }));
      });
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  selectBook(fileName: string): void {
    if (this.selected) {
      return;
    }
    this.selected = true;
    this.epubService.updateBookLoading(true);
    caches.match(fileName).then(response => {
      response.arrayBuffer().then(epubBuffer => {
        this.epubService.openBook(epubBuffer, 'binary');
      });
    });
  }
}
