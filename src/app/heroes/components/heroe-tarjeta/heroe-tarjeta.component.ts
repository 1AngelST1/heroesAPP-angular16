import { Component , Input} from '@angular/core';
import { Heroe } from '../../interfaces/heroes.interface';

@Component({
  selector: 'app-heroe-tarjeta',
  templateUrl: './heroe-tarjeta.component.html',
    styles: [`
    mat-card {
      margin-top: 20px;
      height: 100%;
      display: flex;
      flex-direction: column;
    }

    mat-card-content {
      flex-grow: 0;
      flex-shrink: 0;
    }

    mat-card-title {
      font-size: 1.5rem;
      line-height: 1.2;
      height: 3.6rem;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
      overflow: hidden;
    }

    mat-card-subtitle {
      font-size: 1rem;
      margin-bottom: 10px;
      height: 2.5rem;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
      overflow: hidden;
    }

    img {
      width: 100%;
      height: 400px;
      object-fit: contain;
      object-position: center;
      background-color: transparent;
    }

    mat-card-actions {
      margin-top: auto;
      display: flex;
      flex-wrap: wrap;
      gap: 8px;
      height: 52px;
      align-items: center;
    }

    mat-card-content h3 {
      margin: 10px 0;
      font-size: 1.2rem;
      height: 2.4rem;
      line-height: 1.2;
    }

    mat-card-content p {
      font-size: 0.95rem;
      line-height: 1.5;
      display: -webkit-box;
      -webkit-line-clamp: 4;
      -webkit-box-orient: vertical;
      overflow: hidden;
      height: 5.7rem;
    }

    /* Responsive: pantallas pequeñas */
    @media (max-width: 600px) {
      img {
        height: 300px;
      }

      mat-card-title {
        font-size: 1.3rem;
      }

      mat-card-content h3 {
        font-size: 1.1rem;
      }

      mat-card-content p {
        font-size: 0.9rem;
      }
    }
  `]
})
export class HeroeTarjetaComponent {
  @Input() heroe!: Heroe;
}
