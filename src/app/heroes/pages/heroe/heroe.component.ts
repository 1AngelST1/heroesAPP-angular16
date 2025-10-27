import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from 'rxjs/operators';

import { HeroesService } from '../../services/heroes.service';
import { Heroe } from '../../interfaces/heroes.interface';

@Component({
  selector: 'app-heroe',
  templateUrl: './heroe.component.html',
  styles: [`
    img {
      width: 100%;
      border-radius: 5px;
    }

    .heroe-container {
      display: flex;
      flex-direction: row;
      gap: 30px;
      padding: 20px;
    }

    .heroe-info,
    .heroe-details {
      flex: 1 1 50%;
    }

    /* Responsive: pantallas pequeñas */
    @media (max-width: 600px) {
      .heroe-container {
        flex-direction: column;
      }
    }
  `]
})
export class HeroeComponent implements OnInit {

  heroe!: Heroe;

  constructor( private activatedRoute: ActivatedRoute,
               private heroesService: HeroesService,
               private router: Router ) { }

  ngOnInit(): void {

    this.activatedRoute.params
      .pipe(
        switchMap( ({ id }) => this.heroesService.getHeroePorId(id) )
      )
      .subscribe( heroe => this.heroe = heroe );

  }

  regresar() {
    this.router.navigate(['/heroes/listado']);
  }

}
