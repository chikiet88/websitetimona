import { Pipe, PipeTransform, SecurityContext  } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
@Pipe({
  name: 'theme1'
})
export class Theme1Pipe implements PipeTransform {
  constructor(private sanitizer: DomSanitizer) {}
  transform(value: string): SafeHtml  {
    return this.sanitizer.bypassSecurityTrustHtml(value);
  }

}
