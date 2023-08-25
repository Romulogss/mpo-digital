import {Injectable} from '@angular/core';
import {Cliente} from "../models/entidades/cliente";
import {ClienteService} from "./cliente.service";
import {MensagemService} from "./mensagem.service";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {ObjetivoDoCreditoEnum, SetorEnum, TipoPessoaEnum} from "../models/enums/enums-types";
import {Setor, TipoPessoa} from "../models/interfaces/dados-basicos";
import {MaskitoElementPredicateAsync} from "@maskito/core";
import {CustomValidators} from "../utils/custom-validators";

@Injectable({
  providedIn: 'root'
})
export class ClienteFichaService {
  readonly MASCARAS = {
    CPF: {
      mask: [/\d/, /\d/, /\d/, '.', /\d/, /\d/, /\d/, '.', /\d/, /\d/, /\d/, '-', /\d/, /\d/]
    },
    CNPJ: {
      mask: [/\d/, /\d/, '.', /\d/, /\d/, /\d/, '.', /\d/, /\d/, /\d/, '/', /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/]
    }
  }
  readonly maskPredicate: MaskitoElementPredicateAsync = async (el) => (el as HTMLIonInputElement).getInputElement()

  cliente: Cliente;
  form: FormGroup;
  listaObjetivosDeCredito = ObjetivoDoCreditoEnum.valores();
  listaTipoPessoa: TipoPessoa[] = TipoPessoaEnum.valores();
  setores: Setor[] = SetorEnum.valores();

  constructor(
    private service: ClienteService,
    private msgService: MensagemService,
    private fb: FormBuilder
  ) {
    this.iniciarForm()
  }

  private iniciarForm() {
    this.form = this.fb.group({
      tipoPessoa: [this.cliente?.tipoPessoa, Validators.required],
      nomeCompleto: [this.cliente?.nomeCompleto, Validators.required],
      nomeAbreviado: [this.cliente?.nomeAbreviado, Validators.required],
      cpfCnpj: [this.cliente?.cpfCnpj, [Validators.required, CustomValidators.cpf]],
      cnpj: [this.cliente?.cnpj, [Validators.required, CustomValidators.cpfCnpj]],
      email: [this.cliente?.email, [Validators.required, Validators.email]],
      codigoSetor: [this.cliente?.ocupacao.codigoSetor, Validators.required],
      isEmailProprio: [],
      isWhatsapp: [],
      resnomeBairro: [''],
      resCidade: [''],
      numeroResidencia: [''],
      descricaoLogradouro: [''],
      complemento: [''],
      imovelProprio: [''],
      detalheImovelProprio: [''],
      grauInteresse: [100],
      objetivoDoCredito: ['', Validators.required]
    })
  }

  public iniciarCliente(idCliente: number) {
    if (idCliente == 0) {
      this.cliente = new Cliente();
      this.cliente.preView();
      this.iniciarForm()
    } else {
      this.service.buscarClienteCompleto(null, idCliente).then(cliente => {
        this.cliente = cliente;
        this.iniciarForm()
      }).catch(err => {
        console.log(err)
        this.msgService.showAlertMensagem('Não foi possível carregar o cliente', 'Erro')
      })
    }
  }

  public postForm() {
  }

  get isPF() {
    return this.form.get('tipoPessoa').value === TipoPessoaEnum.FISICA.nome || this.form.get('tipoPessoa').value == null;
  }
}
