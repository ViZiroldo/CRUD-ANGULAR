import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Pessoa, Teste } from 'src/app/shared';
import { PessoaService } from '../services/pessoa.service';
import { ConsultaCEPService } from '../services/consultaCEP.service';

@Component({
  selector: 'app-insert-edit-pessoa',
  templateUrl: './insert-edit-pessoa.component.html',
  styleUrls: ['./insert-edit-pessoa.component.css']
})
export class InsertEditPessoaComponent implements OnInit {
  @ViewChild('formPessoa') formPessoa!: NgForm;
  isNewPessoa: boolean = true;
  pessoa: Pessoa = new Pessoa();
  id!: string;
  isLoading!: boolean;
  resultadoCEP!: any;
  formNome!: string;
  formSobrenome!: string;
  formCPF!: string;
  formNacionalidade!: string;
  formTelefone!: string;
  formEmail!: string;
  formCEP!: string
  formNumero!: number;
  erro: Teste = new Teste();

  constructor(
    private pessoaService: PessoaService,
    private route: ActivatedRoute,
    private router: Router,
    private toastr: ToastrService,
    private cepService: ConsultaCEPService
  ) { }


  ngOnInit(): void {
    this.pessoa = new Pessoa();
    this.isLoading = false;

    this.id = this.route.snapshot.params['id'];
    this.isNewPessoa = !this.id;

    if (!this.isNewPessoa) {
      this.pessoaService.getById(this.id).subscribe(
        pessoa => {
          this.pessoa = pessoa;
        }
      );
    }
  }

  consultaCEP() {
    this.formNome = this.formPessoa.form.value.nome ===  undefined ? '' : this.formPessoa.form.value.nome;
    this.formSobrenome = this.formPessoa.form.value.sobrenome ===  undefined ? '' : this.formPessoa.form.value.sobrenome;
    this.formCPF = this.formPessoa.form.value.cpf ===  undefined ? '' : this.formPessoa.form.value.cpf;
    this.formNacionalidade = this.formPessoa.form.value.nacionalidade ===  undefined ? '' : this.formPessoa.form.value.nacionalidade;
    this.formTelefone = this.formPessoa.form.value.telefone ===  undefined ? '' : this.formPessoa.form.value.telefone;
    this.formEmail = this.formPessoa.form.value.email ===  undefined ? '' : this.formPessoa.form.value.email;
    this.formNumero = this.formPessoa.form.value.numero ===  undefined ? '' : this.formPessoa.form.value.numero;
    this.formCEP = this.formPessoa.form.value.cep;

    this.cepService.consultaCEP(this.formCEP)
    .subscribe((dados) => this.populaDadosForm(dados,));
  }

  populaDadosForm(dados: any) {

   this.formPessoa.setValue({
    nome: this.formNome,
    sobrenome: this.formSobrenome,
    cpf: this.formCPF,
    nacionalidade: this.formNacionalidade,
    telefone: this.formTelefone,
    email: this.formEmail,
    cep: this.formCEP,
    cidade: dados.localidade,
    estado: dados.uf,
    logradouro: dados.logradouro,
    numero:this.formNumero
   })
  }

  save(): void {
    this.isLoading = true;
    if (this.formPessoa.form.valid) {
      if (this.isNewPessoa) {
        this.pessoaService.insert(this.pessoa)
        .subscribe(
          (res) => {
            this.isLoading = false;
            this.router.navigate(["/pessoas"]);
          },
          (err) => {
            debugger
            this.erro = err;
            if(this.erro.error?.errors != null){
              alert(this.erro.error.errors);
            }
          }
        )
      }
      else {
        this.pessoaService.update(this.id, this.pessoa)
        .subscribe(
          (res) => {
            this.isLoading = false;
            this.router.navigate(["/pessoas"]);
          },
          (err) => {
            debugger
            this.erro = err;
            if(this.erro.error?.errors != null){
              alert(this.erro.error.errors);
            }
          }
        )
        // (
        //   pessoa => {
        //     this.isLoading = false;
        //     this.router.navigate(["/pessoas"]);
        //   }
        // )
      }
      this.isLoading = false;
    }

    this.isLoading = false;
  }
}
