import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: [`
    .login-container {
      display: flex;
      justify-content: center;
      align-items: center;
      min-height: 100vh;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      padding: 20px;
    }

    .login-card {
      width: 100%;
      max-width: 450px;
      padding: 40px;
      box-shadow: 0 10px 40px rgba(0, 0, 0, 0.3);
    }

    .login-header {
      text-align: center;
      margin-bottom: 30px;
    }

    .login-header h1 {
      font-size: 2rem;
      margin: 0;
      color: #333;
    }

    .login-header p {
      color: #666;
      margin-top: 8px;
    }

    .login-form {
      display: flex;
      flex-direction: column;
      gap: 20px;
    }

    mat-form-field {
      width: 100%;
    }

    .button-group {
      display: flex;
      flex-direction: column;
      gap: 12px;
      margin-top: 10px;
    }

    .button-group button {
      width: 100%;
      height: 48px;
      font-size: 1rem;
      font-weight: 500;
    }

    .error-message {
      color: #f44336;
      font-size: 0.9rem;
      margin-top: 10px;
      text-align: center;
    }

    .divider-container {
      display: flex;
      align-items: center;
      margin: 20px 0;
    }

    .divider-line {
      flex: 1;
      height: 1px;
      background-color: #ddd;
    }

    .divider-text {
      padding: 0 15px;
      color: #666;
      font-size: 0.9rem;
    }

    /* Responsive */
    @media (max-width: 600px) {
      .login-card {
        padding: 30px 20px;
      }

      .login-header h1 {
        font-size: 1.6rem;
      }
    }
  `]
})
export class LoginComponent {

  usuario: string = '';
  email: string = '';
  errorMessage: string = '';
  
  private baseUrl: string = environment.baseUrl;

  constructor(
    private router: Router,
    private authService: AuthService,
    private http: HttpClient
  ) { }

  login() {
    this.errorMessage = '';

    // Validar campos vacíos
    if (!this.usuario.trim() || !this.email.trim()) {
      this.errorMessage = '⚠️ Por favor, ingresa usuario y email';
      return;
    }

    // Buscar el usuario en la base de datos
    this.http.get<any[]>(`${this.baseUrl}/usuarios`)
      .subscribe({
        next: (usuarios) => {
          // Buscar usuario que coincida con las credenciales
          const usuarioEncontrado = usuarios.find(u => 
            u.usuario === this.usuario.trim() && 
            u.email.toLowerCase() === this.email.trim().toLowerCase()
          );

          if (!usuarioEncontrado) {
            this.errorMessage = '❌ Usuario o email incorrectos';
            return;
          }

          // Usuario encontrado, hacer login con ese ID
          console.log('✅ Usuario encontrado:', usuarioEncontrado);
          
          this.http.get<any>(`${this.baseUrl}/usuarios/${usuarioEncontrado.id}`)
            .subscribe({
              next: (resp) => {
                // Guardar el token (usando el ID del usuario)
                localStorage.setItem('token', resp.id);
                console.log('✅ Login exitoso, token guardado:', resp.id);
                
                // Navegar a heroes
                this.router.navigate(['./heroes']);
              },
              error: (err) => {
                console.error('Error al obtener usuario:', err);
                this.errorMessage = '❌ Error al conectar con el servidor';
              }
            });
        },
        error: (err) => {
          console.error('Error al buscar usuario:', err);
          this.errorMessage = '❌ Error al conectar con el servidor';
        }
      });
  }

  ingresarSinLogin() {
    // Este método ya NO ingresa, solo muestra warning como antes
    console.warn('⚠️ No se puede ingresar sin login cuando el guard está activo');
    this.errorMessage = '⚠️ No se puede ingresar sin login. Debes validar tus credenciales.';
  }

}
