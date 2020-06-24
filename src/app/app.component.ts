import { Component } from '@angular/core';
import { Title, Meta } from '@angular/platform-browser';

import { EpubService } from './shared/epub.service';
import { SettingsService } from './shared/settings.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent {
  title = 'ESPACIO';

  constructor(
    private titleService: Title,
    private metaService: Meta,
    private epubService: EpubService,
    private settingsService: SettingsService,
  ) {
    this.epubService.metadata$.subscribe(metadata => {
      this.setTitle(`${metadata.title} - ${metadata.creator}`);
      // Store metadata if is new book
      // const fileName = this.epubService.fileName$.getValue();
      // if (fileName) {
      //   console.log(fileName, metadata);
      // }
    });
    this.settingsService.theme$.subscribe(theme => {
      this.setThemeColor((theme === 'dark') ? '#212121' : '#f5f5f5');
    });
  }

  setTitle(newTitle: string): void {
    this.titleService.setTitle(newTitle);
  }

  setThemeColor(color: string): void {
    this.metaService.updateTag({ name: 'theme-color', content: color });
  }
}
