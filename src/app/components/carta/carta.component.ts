import { Component, OnInit, Input } from '@angular/core';
import { Carta } from '../../models/carta';

@Component({
  selector: 'app-carta',
  templateUrl: './carta.component.html',
  styleUrls: ['./carta.component.css']
})
export class CartaComponent implements OnInit {

  @Input('carta') carta: Carta;

  constructor() { }

  ngOnInit() {}

}
