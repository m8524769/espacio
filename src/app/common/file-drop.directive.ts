import { Directive, HostListener, Output, EventEmitter, HostBinding } from '@angular/core';

@Directive({
  selector: '[appFileDrop]',
})
export class FileDropDirective {

  constructor() { }

  @Output() fileDropped = new EventEmitter<File>();

  @HostBinding('style.opacity') opacity: string = '0.4';

  @HostListener('dragover', ['$event'])
  onDragOver(event: DragEvent): void {
    event.preventDefault();
    event.stopPropagation();
    this.opacity = '1';
  }

  @HostListener('dragleave', ['$event'])
  onDragLeave(event: DragEvent): void {
    event.preventDefault();
    event.stopPropagation();
    this.opacity = '0.4';
  }

  @HostListener('drop', ['$event'])
  onDrop(event: DragEvent): void {
    event.preventDefault();
    event.stopPropagation();
    this.opacity = '0.4';

    const files = event.dataTransfer.files;
    if (files.length > 0) {
      this.fileDropped.emit(files.item(0));
    }
  }
}
