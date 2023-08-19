import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-card-menu',
  templateUrl: './card-menu.component.html',
  styleUrls: ['./card-menu.component.scss'],
})
export class CardMenuComponent implements OnInit {

  @Input() title!: string;
  @Input() icon!: string;
  @Input() url!: string;
  constructor() { }
  ngOnInit() {}

}
