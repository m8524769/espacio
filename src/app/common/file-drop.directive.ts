import { Directive, HostListener, Output, EventEmitter, HostBinding } from '@angular/core';

@Directive({
  selector: '[appFileDrop]'
})
export class FileDropDirective {

  constructor() { }

  @Output() onFileDropped = new EventEmitter<any>();

  @HostBinding('style.opacity')
  private opacity = '0.4';

  @HostListener('dragover', ['$event'])
  onDragOver(event) {
    event.preventDefault();
    event.stopPropagation();
    this.opacity = '1';
  }

  @HostListener('dragleave', ['$event'])
  public onDragLeave(event) {
    event.preventDefault();
    event.stopPropagation();
    this.opacity = '0.4';
  }

  @HostListener('drop', ['$event'])
  public ondrop(event) {
    event.preventDefault();
    event.stopPropagation();
    this.opacity = '0.4';
    let files = event.dataTransfer.files;
    if (files.length > 0) {
      this.onFileDropped.emit(files);
    }
  }
}
