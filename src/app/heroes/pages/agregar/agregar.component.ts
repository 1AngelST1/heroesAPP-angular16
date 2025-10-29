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
      border-radius: 5px;
    }

    .agregar-container {
      display: flex;
      flex-direction: row;
      gap: 40px;
      padding: 20px;
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
    }

    .spacer {
      flex: 1 1 auto;
    }

    .image-column {
      flex: 1 1 50%;
    }

    /* Responsive: pantallas pequeñas */
    @media (max-width: 600px) {
      .agregar-container {
        flex-direction: column;
      }

      .form-row {
        flex-direction: column;
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
      width: '250px',
      data: this.heroe
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

