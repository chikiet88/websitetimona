import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Pipe({
  name: 'tintucdetail'
})
export class TintucdetailPipe implements PipeTransform {
  constructor(private sanitizer: DomSanitizer) {}
  transform(value: string)  {
    return this.sanitizer.bypassSecurityTrustHtml(value);
  }
}
