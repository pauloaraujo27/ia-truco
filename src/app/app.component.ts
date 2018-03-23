import { Component } from '@angular/core';
import { Baralho } from './models/baralho';
import { Jogador } from './models/jogador';
import { Carta } from './models/carta';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  private _baralho: Baralho = new Baralho;
  jogadores = new Array<Jogador>();
  cartaMesaIa: Carta;
  cartaMesaJa: Carta;

  placar = {
    ia : 0,
    ja: 0
  };

  constructor() {
    this._baralho.embaralhar();
    this.jogadores.push(new Jogador('IA', 'boot', this._pegarCartas()));
    this.jogadores.push(new Jogador('JA', 'Jogador', this._pegarCartas()));
  }

  jogarCarta(carta: Carta) {

    carta = this.jogadores[1].jogarCarta(carta);

    let jogavel: Carta = null;
    this.jogadores[0].cartas.forEach(el => {
      if (carta.valor < el.valor) {
        jogavel = el;
      } else if (!jogavel) {
        jogavel = el;
      }
    });

    jogavel = this.jogadores[0].jogarCarta(jogavel);

    if (jogavel.valor > carta.valor) {
      this.placar.ia++;
    } else if (jogavel.valor < carta.valor) {
      this.placar.ja++;
    }

    this.cartaMesaIa = jogavel;
    this.cartaMesaJa = carta;
  }

  reiniciar() {
    this._baralho.embaralhar();

    this.cartaMesaIa = null;
    this.cartaMesaJa = null;

    this.jogadores.forEach(jogador => {
      jogador.cartas = this._pegarCartas();
    });

    this.placar = {
      ia : 0,
      ja: 0
    };
  }

  private _pegarCartas(): Array<Carta> {
    const array = [];
    for (let i = 0; i < 3; i++) {
      array.push(this._baralho.pegarCarta());
    }
    return array;
  }
}
