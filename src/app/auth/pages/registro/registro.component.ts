import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styles: [`
    .registro-container {
      display: flex;
      justify-content: center;
      align-items: center;
      min-height: 100vh;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      padding: 20px;
    }

    .registro-card {
      width: 100%;
      max-width: 500px;
      padding: 40px;
      box-shadow: 0 10px 40px rgba(0, 0, 0, 0.3);
    }

    .registro-header {
      text-align: center;
      margin-bottom: 30px;
    }

    .registro-header h1 {
      font-size: 2rem;
      margin: 0;
      color: #333;
    }

    .registro-header p {
      color: #666;
      margin-top: 8px;
    }

    .registro-form {
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

    .success-message {
      color: #4caf50;
      font-size: 0.95rem;
      margin-top: 10px;
      text-align: center;
      padding: 10px;
      background-color: #e8f5e9;
      border-radius: 4px;
    }

    .error-message {
      color: #f44336;
      font-size: 0.9rem;
      margin-top: 10px;
      text-align: center;
    }

    .login-link {
      text-align: center;
      margin-top: 20px;
      color: #666;
    }

    .login-link a {
      color: #667eea;
      text-decoration: none;
      font-weight: 500;
    }

    .login-link a:hover {
      text-decoration: underline;
    }

    /* Responsive */
    @media (max-width: 600px) {
      .registro-card {
        padding: 30px 20px;
      }

      .registro-header h1 {
        font-size: 1.6rem;
      }
    }
  `]
})
export class RegistroComponent {

  usuario: string = '';
  email: string = '';
  errorMessage: string = '';
  successMessage: string = '';
  
  private baseUrl: string = environment.baseUrl;

  constructor(
    private router: Router,
    private http: HttpClient
  ) { }

  registrar() {
    this.errorMessage = '';
    this.successMessage = '';

    // Validar campos vacíos
    if (!this.usuario.trim() || !this.email.trim()) {
      this.errorMessage = '⚠️ Por favor, completa todos los campos';
      return;
    }

    // Validar formato de email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(this.email)) {
      this.errorMessage = '⚠️ Por favor, ingresa un email válido';
      return;
    }

    // Primero obtener todos los usuarios para calcular el siguiente ID
    this.http.get<any[]>(`${this.baseUrl}/usuarios`)
      .subscribe({
        next: (usuarios) => {
          // Calcular el siguiente ID de forma incremental
          let siguienteId = 1;
          if (usuarios && usuarios.length > 0) {
            // Encontrar el ID máximo
            const maxId = Math.max(...usuarios.map(u => parseInt(u.id) || 0));
            siguienteId = maxId + 1;
          }

          // Crear nuevo usuario con ID incremental
          const nuevoUsuario = {
            id: siguienteId.toString(),
            usuario: this.usuario.trim(),
            email: this.email.trim().toLowerCase()
          };

          // Guardar en db.json
          this.http.post(`${this.baseUrl}/usuarios`, nuevoUsuario)
            .subscribe({
              next: (resp: any) => {
                console.log('✅ Usuario registrado con ID:', resp.id);
                this.successMessage = '✅ ¡Registro exitoso! Redirigiendo al login...';
                
                // Limpiar campos
                this.usuario = '';
                this.email = '';
                
                // Redirigir al login después de 2 segundos
                setTimeout(() => {
                  this.router.navigate(['/auth/login']);
                }, 2000);
              },
              error: (err) => {
                console.error('Error al guardar usuario:', err);
                this.errorMessage = '❌ Error al registrar usuario. Intenta nuevamente.';
              }
            });
        },
        error: (err) => {
          console.error('Error al obtener usuarios:', err);
          this.errorMessage = '❌ Error al conectar con el servidor.';
        }
      });
  }

  cancelar() {
    this.router.navigate(['/auth/login']);
  }

}
