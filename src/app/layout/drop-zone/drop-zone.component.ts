import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { EpubService } from 'src/app/shared/epub.service';

@Component({
  selector: 'app-drop-zone',
  templateUrl: './drop-zone.component.html',
  styleUrls: ['./drop-zone.component.sass']
})
export class DropZoneComponent implements OnInit {
  loading$: Observable<boolean>;

  constructor(
    private epubService: EpubService,
  ) { }

  ngOnInit(): void {
    this.loading$ = this.epubService.isBookLoading$;
  }

  openEpubFile(files: File[]): void {
    this.epubService.updateBookLoading(true);

    const epubFile = files[0];
    if (epubFile.type !== 'application/epub+zip') {
      console.warn('Mime type is not application/epub+zip.');
    }
    if (window.FileReader) {
      const fileReader = new FileReader();
      fileReader.onload = event => {
        const epubBuffer = event.target.result as ArrayBuffer;
        this.epubService.openBook(epubBuffer, 'binary');
        this.cacheEpubFile(epubFile.name, epubBuffer);
      }
      fileReader.readAsArrayBuffer(epubFile);
    }
  }

  cacheEpubFile(fileName: string, epubBuffer: ArrayBuffer): void {
    caches.open('espacio/epub-file').then(cache => {
      cache.put(fileName, new Response(epubBuffer, {
        status: 200,
        headers: new Headers({
          'Content-Type': 'application/epub+zip',
          'Content-Length': epubBuffer.byteLength.toString(),
        }),
      })).then(() => {
        // Update fileName$ in epubService
        this.epubService.fileName$.next(fileName);
        // console.log(`${fileName} is cached in CacheStorage.`);
      });
    });
  }
}
