import { HttpErrorResponse } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, of, tap } from 'rxjs';
import { LoginDto } from 'src/app/model/auth';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  model = new LoginDto();
  errorMessage = '';

  constructor(private authService: AuthService, private router: Router) {}

  login() {
    this.authService
      .login(this.model)
      .pipe(
        tap((dati) => console.log('COMPONENTE', dati)),
        catchError((err: HttpErrorResponse) => {
          this.errorMessage = err.error;
          return of(undefined);
        })
      )
      .subscribe((loggedUser) => {
        console.log('SUBSCRIBE');

        if (loggedUser) {
          this.router.navigate(['']);
        }
      });
  }
}
