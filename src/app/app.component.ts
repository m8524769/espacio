import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';

import { EpubService } from './shared/epub.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent {
  title = 'ESPACIO';

  constructor(
    private titleService: Title,
    private epubService: EpubService,
  ) {
    this.epubService.metadata$.subscribe(metadata => {
      this.setTitle(`${metadata.title} - ${metadata.creator}`);
    });
  }

  setTitle(newTitle: string) {
    this.titleService.setTitle(newTitle);
  }
}
