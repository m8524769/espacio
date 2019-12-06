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
      console.error('not epub file');
      return;
    }
    if (window.FileReader) {
      const fileReader = new FileReader();
      fileReader.onload = event => {
        this.epubService.openBook(event);
      }
      fileReader.readAsArrayBuffer(epubFile);
    }
  }
}
