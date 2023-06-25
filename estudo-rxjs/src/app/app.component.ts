import { Component, OnDestroy, OnInit } from '@angular/core';
import { GeolocationService } from './services/geolocation.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'estudo-rxjs';
  coordenadas? : GeolocationCoordinates;
  inscricao? : Subscription;

  constructor (private geolocation: GeolocationService) {}
 
  ngOnInit(): void {
    this.inscricao = this.geolocation.positionObservable().subscribe({
      next: (coods) => {
        this.coordenadas = coods;
      }, 
      error: (error) => {
        alert(error.message);
      } 
    });
         
   
  }
  ngOnDestroy(): void {
   this.inscricao?.unsubscribe();
  }
;
  
  mostrarRelogio: boolean = true;

  alternar(): void{
    this.mostrarRelogio = !this.mostrarRelogio;
  }
}
