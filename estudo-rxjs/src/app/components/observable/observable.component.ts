import { Component } from '@angular/core';
import { Observable, Subscriber, filter, first, from, last, map, observable, of } from 'rxjs';

@Component({
  selector: 'app-observable',
  templateUrl: './observable.component.html',
  styleUrls: ['./observable.component.css']
})
export class ObservableComponent {
  constructor(){
    //this.testeObservable();
    //this.testeOperadoresCriacao();
    //this.testeOperadoresFiltragem();
    //this.testeOperadoresTransformacao();
    this.testeComposicao();
  }

  testeComposicao() {
    const obs = this.randomNumbers(5);
    obs
    .pipe(
      map((num) => num / 2),
      filter((num) => num % 1 == 0)
    )
    .subscribe({
      next: (value) => {
        console.log(value);
      }
    })
  }

  randomNumbers(total: number): Observable<number> {
    return new Observable<number>((Subscriber) => {
      for(let i = 0; i < total; i++){
        const numero = Math.floor(Math.random() * 100);
        Subscriber.next(numero);
      }
      Subscriber.complete();
    });
  }

  testeOperadoresTransformacao(){
    const obs = from([10 ,20, 30, 40]);
    obs.pipe(map((num) => num + 1)).subscribe({
      next: (num) => {
        console.warn(`numero mapeado ${num}`);
      }
    })
  }


  testeOperadoresFiltragem() {
    const obs = from([10 ,20, 30]);
    obs.pipe(first()).subscribe({
      next: (num) => {
        console.warn(`primeiro valor ${num}`);
      }
    });
    obs.pipe(last()).subscribe({
      next: (num) => {
        console.warn(`ultimo valor ${num}`);
      }
    });
    obs.pipe(filter((num) => num < 30)).subscribe({
      next: (num) => {
        console.warn(`numero filtrado ${num}`);
      }
    })
    

  }

  testeOperadoresCriacao() {
    const obs = from([10, 20 ,30]);
    obs.subscribe({
      next: (num) => {
        console.warn(`numero emitido pelo fron ${num}`);
      }
    })
    const obs2 = of(1, 2 ,3);
    obs2.subscribe({
      next: (num) => {
        console.warn(`numero emitido pelo of ${num}`);
      }
    })
  }
testeObservable(): void {
  const obs: Observable<number> = new Observable<number>((Subscriber) => {
    Subscriber.next(1);
    Subscriber.next(2);
    Subscriber.next(3);
    Subscriber.complete();
  });
  obs.subscribe({
    next: (numero) => {
      
    }
  })
}
}
