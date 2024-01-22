import { Injectable } from '@angular/core';
import { LoggedUser, LoginDto, RegisterDto } from '../model/auth';
import { environment } from 'src/environments/environment';
import { Observable, tap } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}

  login(model: LoginDto): Observable<LoggedUser> {
    return this.http
      .post<LoggedUser>(`${environment.JSON_SERVER_BASE_URL}/login`, model)
      .pipe(
        tap((dati) => console.log('SERVIZIO', dati)),
        tap((user) => this.setLoggedUser(user))
      );
  }

  register(model: RegisterDto): Observable<LoggedUser> {
    return this.http.post<LoggedUser>(
      `${environment.JSON_SERVER_BASE_URL}/register`,
      model
    );
  }

  setLoggedUser(user: LoggedUser) {
    localStorage.setItem('user', JSON.stringify(user));
  }

  getLoggedUser(): LoggedUser | null {
    let userStorage = localStorage.getItem('user');

    if (userStorage != null) {
      let u: LoggedUser = JSON.parse(userStorage);
      return u;
    }

    return null;
  }

  getLoggedUserId(): number | null {
    const loggedUser = this.getLoggedUser();
    return loggedUser ? loggedUser.user.id : null;
  }

  get isUserLogged(): boolean {
    return this.getLoggedUser() != null;
  }

  logout() {
    localStorage.removeItem('user');
  }
}
