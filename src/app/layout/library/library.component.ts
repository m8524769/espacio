import { Component, OnInit } from '@angular/core';
import { EpubService } from 'src/app/shared/epub.service';

@Component({
  selector: 'app-library',
  templateUrl: './library.component.html',
  styleUrls: ['./library.component.sass']
})
export class LibraryComponent implements OnInit {
  books: any[] = [];

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

    this.epubService.metadata$.subscribe(metadata => {
      const fileName = this.epubService.fileName$.getValue();
      if (fileName) {
        caches.has(metadata.title).then(hasCache => {
          if (!hasCache) {
            const blob = new Blob([JSON.stringify({ fileName, metadata }, null, 2)]);
            caches.open('espacio/library').then(cache => {
              cache.put(metadata.title, new Response(blob, {
                status: 200,
                headers: new Headers({
                  'Content-Type': 'application/json',
                }),
              }));
            });
          }
        });
      }
    });
  }

  selectBook(fileName: string) {
    caches.match(fileName).then(response => {
      response.arrayBuffer().then(epubBuffer => {
        this.epubService.openBook(epubBuffer, 'binary');
      });
    });
  }
}
