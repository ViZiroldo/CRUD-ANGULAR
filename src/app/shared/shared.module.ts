import { NgModule, Pipe } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MinValidatorDirective, NumericDirective } from './directives';
import { PipePipe } from './pipes';



@NgModule({
  declarations: [
    MinValidatorDirective,
    NumericDirective,
    PipePipe
  ],
  imports: [
    CommonModule
  ],
  exports: [
    MinValidatorDirective,
    NumericDirective,
    PipePipe
  ]
})
export class SharedModule { }
