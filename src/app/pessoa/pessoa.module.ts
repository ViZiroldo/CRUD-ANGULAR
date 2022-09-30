import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { SharedModule } from '../shared';
import { IConfig, NgxMaskModule } from 'ngx-mask';
import { ListPessoaComponent } from './list-pessoa/list-pessoa.component';
import { InsertEditPessoaComponent } from './insert-edit-pessoa/insert-edit-pessoa.component';

export const option: Partial<IConfig> | (() => Partial<IConfig>) = {};

@NgModule({
  declarations: [
    ListPessoaComponent,
    InsertEditPessoaComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    SharedModule,
    NgxMaskModule.forRoot()
  ]
})
export class PessoaModule { }
