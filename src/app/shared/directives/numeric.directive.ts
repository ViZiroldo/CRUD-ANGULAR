import { Directive, ElementRef, HostListener } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Directive({
  selector: '[numeric]',
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: NumericDirective,
    multi: true
  }]
})
export class NumericDirective implements ControlValueAccessor {
  onChange: any;
  onTouched: any;

  constructor(
    private el: ElementRef
  ) { }

  @HostListener('keyup', ['$event'])
  onKeyUp($event: any) {
    let value = $event.target.value;

    value = value.replace(/[\D]/g, '');
    $event.target.value = value;

    this.onChange(value);
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  writeValue(obj: any): void {
    this.el.nativeElement.value = obj;
  }
}
