import { Component, OnInit } from '@angular/core';
import { EpubService } from 'src/app/shared/epub.service';
import { zip } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-library',
  templateUrl: './library.component.html',
  styleUrls: ['./library.component.sass']
})
export class LibraryComponent implements OnInit {
  books: any[] = [];
  selected: boolean = false;

  constructor(
    private epubService: EpubService,
  ) { }

  ngOnInit() {
    caches.open('espacio/library').then(cache => {
      cache.keys().then(keys => {
        Promise.all(keys.map(
          key => cache.match(key).then(response => response.json())
        )).then(books => this.books = books.reverse());
      });
    });

    // Cache new book's info
    zip(
      this.epubService.fileName$,
      this.epubService.metadata$,
    ).pipe(
      map(([fileName, metadata]) => ({ fileName, metadata }))
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

  selectBook(fileName: string) {
    if (this.selected) {
      return;
    }
    this.selected = true;
    caches.match(fileName).then(response => {
      response.arrayBuffer().then(epubBuffer => {
        this.epubService.openBook(epubBuffer, 'binary');
      });
    });
  }
}
