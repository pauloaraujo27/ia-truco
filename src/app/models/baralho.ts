import { Carta } from './carta';
import { environment } from '../../environments/environment.prod';

export class Baralho {
  private readonly MAIOR_NUMERO = 10;
  private _cartas: Carta[] = new Array<Carta>();

  public embaralhar() {
    environment.NAIPES.forEach(naipe => {
      environment.NUMERO.forEach(numero => {
        this._cartas.push(new Carta(naipe, numero, this._olharValor(naipe, numero)));
      });
    });

    this._embaralhar(this._cartas);
  }

  public pegarCarta(): Carta {
    const carta = this._cartas[this._cartas.length - 1 ];
    return this._cartas.pop();
  }

  private _olharValor(naipe: string, numero: string ): number {
    let valor = 0;

    environment.ESPECIAIS.forEach(especial => {
      if (`${numero}-${naipe}` === especial) {
        valor = environment.ESPECIAIS.indexOf(especial) + this.MAIOR_NUMERO;
      }
    });

    return valor ? valor : environment.NUMERO.indexOf(numero);
  }

  private _embaralhar(a) {
    let j, x, i;
    for (i = a.length - 1; i > 0; i--) {
        j = Math.floor(Math.random() * (i + 1));
        x = a[i];
        a[i] = a[j];
        a[j] = x;
    }
  }
}
