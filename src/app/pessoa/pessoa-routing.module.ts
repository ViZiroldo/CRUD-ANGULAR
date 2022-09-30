import { Routes } from "@angular/router";
import { InsertEditPessoaComponent } from "./insert-edit-pessoa/insert-edit-pessoa.component";
import { ListPessoaComponent } from "./list-pessoa/list-pessoa.component";

export const PessoaRoutes: Routes = [
  {
    path: 'pessoas',
    redirectTo: 'pessoas/list'
  },
  {
    path: 'pessoas/list',
    component: ListPessoaComponent,
  },
  {
    path: 'pessoas/new',
    component: InsertEditPessoaComponent,
  },
  {
    path: 'pessoas/edit/:id',
    component: InsertEditPessoaComponent,
  }
];
