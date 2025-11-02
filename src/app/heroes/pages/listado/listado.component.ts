import { Component,OnInit } from '@angular/core';
import { HeroesService } from '../../services/heroes.service';
import { Heroe } from '../../interfaces/heroes.interface';

@Component({
  selector: 'app-listado',
  templateUrl: './listado.component.html',
  styles: [`
    .heroes-container {
      display: flex;
      flex-wrap: wrap;
      justify-content: center;
      gap: 20px;
      padding: 20px;
    }

    .heroe-item {
      flex: 0 0 calc(25% - 20px);
      min-width: 250px;
      max-width: 350px;
      display: flex;
      align-items: stretch;
    }
    
    .heroe-item app-heroe-tarjeta {
      width: 100%;
      display: flex;
    }

    /* Responsive: pantallas muy grandes */
    @media (min-width: 1920px) {
      .heroe-item {
        flex: 0 0 calc(20% - 20px);
      }
    }

    /* Responsive: pantallas grandes */
    @media (min-width: 1280px) and (max-width: 1919px) {
      .heroe-item {
        flex: 0 0 calc(25% - 20px);
      }
    }

    /* Responsive: pantallas medianas-grandes */
    @media (min-width: 960px) and (max-width: 1279px) {
      .heroe-item {
        flex: 0 0 calc(33.333% - 20px);
      }
    }

    /* Responsive: tablets */
    @media (min-width: 600px) and (max-width: 959px) {
      .heroe-item {
        flex: 0 0 calc(50% - 20px);
        min-width: 200px;
      }
    }

    /* Responsive: móviles */
    @media (max-width: 599px) {
      .heroes-container {
        padding: 10px;
        gap: 15px;
      }

      .heroe-item {
        flex: 0 0 100%;
        max-width: 100%;
        min-width: unset;
      }
    }
  `]
})

export class ListadoComponent implements OnInit {
 
  heroes: Heroe[] = [];
  constructor( private heroesService: HeroesService ) { }

  ngOnInit(): void {

    this.heroesService.getHeroes()
      .subscribe( heroes => this.heroes = heroes );

  }

}
