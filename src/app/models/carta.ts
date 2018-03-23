export class Carta {
  naipe: string;
  numero: string;
  valor: number;

  constructor(naipe: string, numero: string, valor: number) {
    this.naipe = naipe;
    this.numero = numero;
    this.valor = valor;
  }

  equalsTo(carta: Carta): boolean {
    return carta.naipe === this.naipe && carta.numero === this.numero;
  }
}
