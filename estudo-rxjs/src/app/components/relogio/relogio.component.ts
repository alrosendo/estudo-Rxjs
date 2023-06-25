import { Component, OnDestroy, OnInit } from '@angular/core';
import { Data } from '@angular/router';
import { Subscription, interval } from 'rxjs';

@Component({
  selector: 'app-relogio',
  templateUrl: './relogio.component.html',
  styleUrls: ['./relogio.component.css']
})
export class RelogioComponent implements OnInit, OnDestroy {

  hoje: Date = new Date();
  inscricao?: Subscription;

  ngOnInit(): void {
      this.inscricao = interval(1000).subscribe({
      next: () => {
      this.hoje = new Date();
      console.warn(`Horario: ${this.hoje.toLocaleTimeString()}`)
      }
      }
      )
  }
  ngOnDestroy(): void {
    this.inscricao?.unsubscribe();
  }
}
