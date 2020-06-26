import { Component, OnInit } from '@angular/core';
import { EpubService } from 'src/app/shared/epub.service';

@Component({
  selector: 'app-drop-zone',
  templateUrl: './drop-zone.component.html',
  styleUrls: ['./drop-zone.component.sass']
})
export class DropZoneComponent implements OnInit {

  constructor(
    private epubService: EpubService,
  ) { }

  ngOnInit() { }

  openEpubFile(files: File[]) {
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

  cacheEpubFile(fileName: string, epubBuffer: ArrayBuffer) {
    // Cache .epub file if is not existed
    caches.match(fileName).then(response => {
      if (!response) {
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
    });
  }
}
