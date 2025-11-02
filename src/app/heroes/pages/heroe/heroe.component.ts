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
      max-height: 600px;
      object-fit: cover;
      border-radius: 5px;
    }

    .heroe-container {
      display: flex;
      flex-direction: row;
      gap: 30px;
      padding: 20px;
      max-width: 1400px;
      margin: 0 auto;
    }

    .heroe-info,
    .heroe-details {
      flex: 1 1 50%;
    }

    .heroe-info h1 {
      font-size: 2rem;
      margin-bottom: 15px;
    }

    .heroe-info small {
      font-size: 1.2rem;
      color: #666;
    }

    .heroe-details h1 {
      font-size: 1.8rem;
      margin-bottom: 15px;
    }

    mat-list-item {
      font-size: 1rem;
      margin-bottom: 8px;
    }

    /* Responsive: tablets */
    @media (max-width: 960px) {
      .heroe-container {
        gap: 20px;
        padding: 15px;
      }

      .heroe-info h1 {
        font-size: 1.7rem;
      }

      .heroe-details h1 {
        font-size: 1.5rem;
      }

      img {
        max-height: 500px;
      }
    }

    /* Responsive: móviles */
    @media (max-width: 600px) {
      .heroe-container {
        flex-direction: column;
        padding: 10px;
        gap: 15px;
      }

      .heroe-info h1 {
        font-size: 1.5rem;
      }

      .heroe-info small {
        font-size: 1rem;
      }

      .heroe-details h1 {
        font-size: 1.3rem;
      }

      img {
        max-height: 400px;
      }

      mat-list-item {
        font-size: 0.95rem;
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
