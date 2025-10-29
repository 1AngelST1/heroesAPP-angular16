import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { AuthService } from '../services/auth.service';

// Guard funcional para CanActivate (proteger rutas individuales)
export const canActivateGuard = (): Observable<boolean> => {
  const authService = inject(AuthService);
  const router = inject(Router);

  return authService.verificaAutenticacion()
    .pipe(
      tap(estaAutenticado => {
        if (!estaAutenticado) {
          router.navigate(['./auth/login']);
        }
      })
    );
};

// Guard funcional para CanMatch (reemplazo de CanLoad en Angular 16)
export const canMatchGuard = (): Observable<boolean> => {
  const authService = inject(AuthService);
  const router = inject(Router);

  return authService.verificaAutenticacion()
    .pipe(
      tap(estaAutenticado => {
        if (!estaAutenticado) {
          router.navigate(['./auth/login']);
        }
      })
    );
};
