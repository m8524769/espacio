import { Directive, Output, EventEmitter, HostListener } from '@angular/core';

@Directive({
  selector: '[appMouseWheel]'
})
export class MouseWheelDirective {

  constructor() { }

  @Output() mouseWheelUp = new EventEmitter();
  @Output() mouseWheelDown = new EventEmitter();

  @HostListener('mousewheel', ['$event'])
  onMouseWheel(event: any) {
    this.handleMouseWheel(event);
  }

  @HostListener('DOMMouseScroll', ['$event'])
  onDomMouseScroll(event: any) {
    this.handleMouseWheel(event);
  }

  handleMouseWheel(event: any) {
    const delta = Math.max(-1, Math.min(1, (event.wheelDelta || -event.detail)));
    if (delta > 0) {
      this.mouseWheelUp.emit(event);
    } else if (delta < 0) {
      this.mouseWheelDown.emit(event);
    }
    event.preventDefault();
  }
}
