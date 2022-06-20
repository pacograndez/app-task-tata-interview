import { Directive, HostListener, Input } from '@angular/core';

@Directive({
  selector: '[appPattern]',
})
export class PatternDirective {
  @Input() customPatter: string;

  patterns = {
    alphaNumeric: /[^a-zA-Z0-9\s]*/g,
  };

  constructor() {}

  getValue(value, patternName: string): string {
    const pattern = this.patterns[patternName];
    const valueReplaced = value.replace(pattern, '');
    return valueReplaced;
  }

  @HostListener('keyup', ['$event'])
  onKeyUpReplaced(event) {
    const { customPatter } = this;
    const value = event.target.value;
    event.target.value = this.getValue(value, customPatter);
  }
}
