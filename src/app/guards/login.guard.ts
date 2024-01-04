import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { inject } from '@angular/core';

export const loginGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const snackBar = inject(MatSnackBar);
  const router = inject(Router);

  if (!authService.isUserLogged) {
    router.navigate(['/login']);

    snackBar.open(
      `La pagina ${route.url} richiede autenticazione.`,
      'Ci sto dentro'
    );
    return false;
  }

  return true;
};
