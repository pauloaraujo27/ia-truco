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
  cartaSelecionada: Carta;
  mostrarProxima: boolean;
  empate: boolean;
  primeiroPonto: Jogador;

  placar = {
    ia: 0,
    ja: 0
  };

  placarGeral = {
    ia: 0,
    ja: 0
  };

  intervalId;

  constructor() {
    this._baralho.embaralhar();
    this.jogadores.push(new Jogador('IA', 'boot', this._pegarCartas()));
    this.jogadores.push(new Jogador('JA', 'Jogador', this._pegarCartas()));
    console.log(this.jogadores[0].cartas);
  }

  jogarCarta(carta: Carta) {

    carta = this.jogadores[1].jogarCarta(carta);

    let jogavel: Carta = null;
    let set;
    this.jogadores[0].cartas.sort((a, b) => {
      if (a.valor > b.valor) {
        set = -1;
        return -1;
      } else if (a.valor == b.valor) {
        set = 0;
        return 0;
      } else {
        set = 1;
        return 1;
      }
    });
    
    let verificaBaralho = this.jogadores[0].cartas;  
    this.jogadores[0].cartas.forEach(el => {
      if (carta.valor < el.valor) {
        jogavel = el;
      } else if (!jogavel) {
        verificaBaralho.map(sel => {
          if (el.valor < sel.valor) {
            jogavel = el;
          } else {
            console.log(el);
            
          }
        });
      }
    });

    jogavel = this.jogadores[0].jogarCarta(jogavel);

    if (jogavel.valor > carta.valor) {
      if (this.placar.ia === 0 && this.placar.ja === 0) {
        this.primeiroPonto = this.jogadores[0];
      }
      this.placar.ia++;
    } else if (jogavel.valor < carta.valor) {
      if (this.placar.ia === 0 && this.placar.ja === 0) {
        this.primeiroPonto = this.jogadores[1];
      }
      this.placar.ja++;
    } else {
      this.empate = true;
    }

    // if de empate na primeira carta
    if (this.empate && (this.placar.ia == 0 && this.placar.ja == 0) ) {
      this.placar.ia++;
      this.placar.ja++;
    }

    // if para pontuar caso haja empate, no caso pontua o que fez o primeiro ponto
    if (this.empate && (this.placar.ia > 0 || this.placar.ja > 0) ) {
      if (this.primeiroPonto === this.jogadores[0] ) {
        this.placar.ia++;
      } else if (this.primeiroPonto === this.jogadores[1]) {
        this.placar.ja++;
      }
    }

    if (this.placar.ia > 1 || this.placar.ja > 1) {
      this.mostrarProxima = true;
    }
    this.cartaMesaIa = jogavel;
    this.cartaMesaJa = carta;
  }

  proxima() {
    this._baralho.embaralhar();
    this.empate = false;
    this.mostrarProxima = false;
    this.primeiroPonto = null;

    this.cartaMesaIa = null;
    this.cartaMesaJa = null;

    this.jogadores.forEach(jogador => {
      jogador.cartas = this._pegarCartas();
    });

    if (this.placar.ia > this.placar.ja) {
      this.placarGeral.ia += 2;
    } else {
      this.placarGeral.ja += 2;
    }

    if (this.placarGeral.ia >= 12 || this.placarGeral.ja >= 12) {
      this.reiniciar();
    } else {
      this.placar = {
        ia: 0,
        ja: 0
      };
    }
  }

  selecionarCarta(carta: Carta) {
    this.cartaSelecionada = carta;
  }

  reiniciar() {
    this._baralho.embaralhar();
    this.primeiroPonto = null;
    this.empate = false;
    this.cartaMesaIa = null;
    this.cartaMesaJa = null;

    this.jogadores.forEach(jogador => {
      jogador.cartas = this._pegarCartas();
    });

    this.placar = {
      ia: 0,
      ja: 0
    };
    this.placarGeral = {
      ia: 0,
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
