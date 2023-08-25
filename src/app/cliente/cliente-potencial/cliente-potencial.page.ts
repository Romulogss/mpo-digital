import {Component, OnInit} from '@angular/core';
import {ClienteFichaService} from "../../../service/cliente-ficha.service";
import {MaskitoElementPredicateAsync, MaskitoOptions} from "@maskito/core";

@Component({
  selector: 'app-cliente-potencial',
  templateUrl: './cliente-potencial.page.html',
  styleUrls: ['./cliente-potencial.page.scss'],
})
export class ClientePotencialPage implements OnInit {

  constructor(
    public service: ClienteFichaService
  ) {
  }

  ngOnInit() {
  }

}
