import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'capslock'
})
export class PipePipe implements PipeTransform {

  transform(value: string | undefined): string {
    if (value) {
      return value.toUpperCase();
    }
    else {
      return "";
    }
  }

}
