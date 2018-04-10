import { Jogador } from './jogador';
import { EventEmitter } from '@angular/core';

export class Partida {
  readonly MAX_TEMPO = 5000; // em milisegundos
  readonly SALTO_PADRAO = 2; // tentos

  nivelPartida = 1;
  finalizarPartida = new EventEmitter;
  finalizarRodada = new EventEmitter;
  temporizador = this.MAX_TEMPO;
  info = {};
  pontosRodada = {};
  pontos = {};
  intervalId;

  constructor(jogadores: Array<Jogador>) {
    jogadores.forEach(jogador => {
      this.pontosRodada[jogador.id] = 0;
      this.pontos[jogador.id] = 0;
      this.info[jogador.id] = { trucando: false, vez: false };
    });

    this.intervalId = setInterval( () => {
      if(this.temporizador === 0) {
        this.temporizador = this.MAX_TEMPO;
      } else {
        this.temporizador--;
      }
    }, 1);
  }

  trucar(jogador: Jogador) {
    Object.keys(this.info)
      .map(key => {
        this.info[key].trucando = false;
      });

    this.info[jogador.id].trucando = true;
    this.nivelPartida++;
  }

  desistir() {
    Object.keys(this.info)
      .map(key => {
        if(this.info[key].trucando) {
          this.pontos[key] += this.SALTO_PADRAO * this.nivelPartida;
        }
      });

    this._verificarSoma();
  }

  ganhador(jogador: Jogador) {
    this.pontos[jogador.id]++;

    this._verificarSoma();
  }

  private _verificarSoma() {
    Object.keys(this.pontos)
      .map(key => {
        if(this.pontos[key] >= 2) {
          this.pontos[key] = 0;
          if(this.pontosRodada[key] >= 12) {
            this._reniciarPontos();
            this.finalizarRodada.emit();
          }
          this.finalizarPartida.emit();
        }
      });
  }

  private _reniciarPontos() {
    Object.keys(this.pontos)
      .map(key => {
          this.pontos[key] = 0
      });

    Object.keys(this.pontosRodada)
      .map(key => {
          this.pontosRodada[key] = 0
      });
  }

}
