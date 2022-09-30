import { Directive } from '@angular/core';
import { AbstractControl, FormControl, NG_VALIDATORS, NG_VALUE_ACCESSOR, ValidationErrors, Validator } from '@angular/forms';

@Directive({
  selector: '[minValidator]',
  providers: [{
    provide: NG_VALIDATORS,
    useExisting: MinValidatorDirective,
    multi: true
  }]
})
export class MinValidatorDirective implements Validator {

  constructor() { }

  validate(control: FormControl)  {
    let value: number = + control.value;

    if (isNaN(value)) {
      return { 'minimo': true, 'requiredValue': 18 }
    }
    if (value < 18) {
      return { 'minimo': true, 'requiredValue': 18 }
    }
    return null;
  }
}
