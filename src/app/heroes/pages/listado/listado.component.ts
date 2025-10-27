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
      flex: 0 0 20%;
      min-width: 200px;
      max-width: 300px;
    }

    /* Responsive: pantallas grandes */
    @media (min-width: 1280px) {
      .heroe-item {
        flex: 0 0 15%;
      }
    }

    /* Responsive: pantallas medianas */
    @media (max-width: 960px) {
      .heroe-item {
        flex: 0 0 30%;
      }
    }

    /* Responsive: pantallas pequeñas */
    @media (max-width: 600px) {
      .heroes-container {
        flex-direction: column;
      }
      .heroe-item {
        flex: 0 0 100%;
        max-width: 100%;
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
