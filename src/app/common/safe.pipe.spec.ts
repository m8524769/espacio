import { TestBed } from '@angular/core/testing';
import { DomSanitizer } from '@angular/platform-browser';

import { SafePipe } from './safe.pipe';

describe('SafePipe', () => {
  it('create an instance', () => {
    const sanitizer = TestBed.inject(DomSanitizer);
    const pipe = new SafePipe(sanitizer);
    expect(pipe).toBeTruthy();
  });
});
