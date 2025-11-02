import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from 'rxjs/operators';

import { Heroe, Publisher } from '../../interfaces/heroes.interface';
import { HeroesService } from '../../services/heroes.service';
import { ConfirmarComponent } from '../../components/confirmar/confirmar.component';

@Component({
  selector: 'app-agregar',
  templateUrl: './agregar.component.html',
  styles: [`
    img {
      width: 100%;
      max-height: 600px;
      object-fit: contain;
      border-radius: 5px;
    }

    .agregar-container {
      display: flex;
      flex-direction: row;
      gap: 40px;
      padding: 20px;
      max-width: 1400px;
      margin: 0 auto;
    }

    .form-column {
      flex: 1 1 50%;
      display: flex;
      flex-direction: column;
      gap: 10px;
    }

    .form-row {
      display: flex;
      flex-direction: row;
      gap: 20px;
    }

    .full-width {
      flex: 1 1 100%;
    }

    mat-form-field {
      width: 100%;
    }

    .button-row {
      display: flex;
      flex-direction: row;
      align-items: center;
      gap: 10px;
      flex-wrap: wrap;
    }

    .spacer {
      flex: 1 1 auto;
    }

    .image-column {
      flex: 1 1 50%;
      display: flex;
      align-items: flex-start;
      justify-content: center;
    }

    h1 {
      font-size: 2rem;
      margin-bottom: 20px;
    }

    h1 small {
      font-size: 1.2rem;
      color: #666;
    }

    /* Responsive: tablets */
    @media (max-width: 960px) {
      .agregar-container {
        gap: 30px;
        padding: 15px;
      }

      h1 {
        font-size: 1.7rem;
      }

      img {
        max-height: 500px;
      }
    }

    /* Responsive: móviles */
    @media (max-width: 600px) {
      .agregar-container {
        flex-direction: column;
        padding: 10px;
        gap: 20px;
      }

      .form-row {
        flex-direction: column;
        gap: 10px;
      }

      h1 {
        font-size: 1.5rem;
      }

      h1 small {
        font-size: 1rem;
        display: block;
        margin-top: 5px;
      }

      .button-row {
        flex-direction: column;
        align-items: stretch;
      }

      .button-row button {
        width: 100%;
      }

      .spacer {
        display: none;
      }

      img {
        max-height: 400px;
      }
    }
  `]
})
export class AgregarComponent implements OnInit {

  publishers = [
    {
      id: 'DC Comics',
      desc: 'DC - Comics'
    },
    {
      id: 'Marvel Comics',
      desc: 'Marvel - Comics'
    },
  ];

  heroe: Heroe = {
    superhero: '',
    alter_ego: '',
    characters: '',
    first_appearance: '',
    publisher: Publisher.DCComics,
    alt_img: '',
  }

  constructor( private heroesService: HeroesService,
               private activatedRoute: ActivatedRoute,
               private router: Router,
               private snackBar: MatSnackBar,
               public dialog: MatDialog ) { }

  ngOnInit(): void {

    if( !this.router.url.includes('editar') ) {
      return;
    }

    this.activatedRoute.params
      .pipe(
        switchMap( ({id}) => this.heroesService.getHeroePorId( id ) )
      )
      .subscribe( heroe => this.heroe = heroe );

  }

  guardar() {
    
    if( this.heroe.superhero.trim().length === 0  ) {
      return;
    }

    if ( this.heroe.id ) {
      // Actualizar
      this.heroesService.actualizarHeroe( this.heroe )
        .subscribe( heroe => this.mostrarSnakbar('Registro actualizado'));

    } else {
      // Crear
      this.heroesService.agregarHeroe( this.heroe )
        .subscribe( heroe => {
          this.router.navigate(['/heroes/editar', heroe.id ]);
          this.mostrarSnakbar('Registro creado');
        })
    }

  }

  borrarHeroe() {

    const dialog = this.dialog.open( ConfirmarComponent, {
      width: '400px',
      data: this.heroe,
      disableClose: true,
      autoFocus: true
    });

    dialog.afterClosed().subscribe(
      (result) => {

        if( result ) {
          this.heroesService.borrarHeroe( this.heroe.id! )
            .subscribe( resp => {
              this.router.navigate(['/heroes']);
            });
        }
        
      }
    )



  }

  mostrarSnakbar( mensaje: string ) {

    this.snackBar.open( mensaje, 'ok!', {
      duration: 2500
    });

  }

}

