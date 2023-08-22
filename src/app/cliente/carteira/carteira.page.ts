import {Component, OnInit} from '@angular/core';
import {ClienteService} from "../../../service/cliente.service";
import {Cliente} from "../../../models/entidades/cliente";
import {SituacaoCliente} from "../../../models/interfaces/dados-basicos";
import {FiltroClienteInterface} from "../../../models/interfaces/filtro-cliente.interface";
import {LogicoEnum, SituacaoClienteEnum} from "../../../models/enums/enums-types";
import {AuthService} from "../../../service/auth.service";
import {MensagemService} from "../../../service/mensagem.service";

@Component({
  selector: 'app-carteira',
  templateUrl: './carteira.page.html',
  styleUrls: ['./carteira.page.scss'],
})
export class CarteiraPage implements OnInit {

  clientes: Cliente[] = [];
  situacoesCliente: SituacaoCliente[] = SituacaoClienteEnum.valores();
  filtro: FiltroClienteInterface = {
    cpfCnpj: null,
    bairro: null,
    nome: null,
    situacao: null
  }
  jaVerificouDias: boolean = false;

  constructor(
    private clienteService: ClienteService,
    private authService: AuthService,
    private msgService: MensagemService
  ) {
  }

  ngOnInit() {
  }

  filterClientes() {
    let limite = 0
    if (this.filtro.nome === '') limite = 0
    if (this.filtro.bairro === '') limite = 0
    if (this.filtro.cpfCnpj === '') limite = 0
    if (this.filtro.situacao === 'Todas') this.filtro.situacao = null;
    this.clienteService.filtrar(this.authService.usuarioLogado.id, this.filtro.nome, this.filtro.cpfCnpj, this.filtro.bairro, this.filtro.situacao, limite)
      .then(dados => {
        this.jaVerificouDias = false;
        this.clientes = dados
        // this.verificarDiasAguardandoDocumentos()
      })
      .catch(erro => console.log(erro));
  }

  removeCliente(cliente: Cliente) {
    Cliente.buscarClienteCompleto(cliente.uuid).then(clienteDb => {
      clienteDb.excluido = true;
      clienteDb.arquivado = LogicoEnum.SIM.nome;
      this.clienteService.salvar(clienteDb).then(() => {
        console.log('excluiu logicamente');
        this.msgService.apresentarMensagemSucesso();
        this.filterClientes();
      })
        .catch(error => console.log(error));
    }).catch(err => {
      console.log('Ocrreu um erro ao remover cliente: ', err);
    })
  }


}
