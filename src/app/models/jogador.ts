import { Carta } from './carta';

export class Jogador {
  id: string;
  nome: string;
  cartas = new Array<Carta>();

  constructor(id: string, nome: string, cartas: Array<Carta>) {
    this.id = id;
    this.nome = nome;
    this.cartas = cartas;
  }

  jogarCarta(carta: Carta): Carta {
    this.cartas = this.cartas
      .filter(elemento => !elemento.equalsTo(carta));
    return carta;
  }

}
