import {Component, Input, OnInit} from '@angular/core';
import {RotasService} from "../../service/rotas.service";
import {MenuItemInterface} from "../../models/interfaces/menu-item.interface";

@Component({
  selector: 'app-card-menu',
  templateUrl: './card-menu.component.html',
  styleUrls: ['./card-menu.component.scss'],
})
export class CardMenuComponent implements OnInit {

  @Input() menu: MenuItemInterface;

  @Input() title!: string;
  @Input() icon!: string;
  @Input() url!: string;
  constructor(
    public rotaService: RotasService
  ) { }
  ngOnInit() {}

}
