import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Pessoa } from 'src/app/shared';
import { PessoaService } from '../services/pessoa.service';

@Component({
  selector: 'app-list-pessoa',
  templateUrl: './list-pessoa.component.html',
  styleUrls: ['./list-pessoa.component.css']
})
export class ListPessoaComponent implements OnInit {

  pessoas: Pessoa[] = [];

  constructor(
    private pessoaService: PessoaService,
    private modalService: NgbModal
  ) { }

  ngOnInit(): void {
    this.pessoas = [];
    this.getAll();
  }

  getAll(): Pessoa[] {
    this.pessoaService.getAll().subscribe({
      next: (data: Pessoa[]) => {
        if (data == null) {
          this.pessoas = [];
        }
        else {
          this.pessoas = data;
        }
      }
    });
    return this.pessoas;
  }

  delete($event: any, pessoa: Pessoa): void {
    $event.preventDefault();
    if (confirm('Deseja realmente remover a pessoa "' + pessoa.nome + '"?')) {
      this.pessoaService.delete(pessoa.id!).subscribe({
        complete:() => {
          this.getAll();
        }
      });
    }
  }

  // openModal(user: User) {
  //   const modalRef = this.modalService.open(UserModalComponent);
  //   modalRef.componentInstance.user = user;
  // }
}
