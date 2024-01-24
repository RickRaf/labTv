import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class PurchasedServiceService {
  private purchased: any[] = [];

  constructor(private http: HttpClient) {}

  getPurchased(userId: number): Observable<any[]> {
    return this.http.get<any[]>(
      `${environment.JSON_SERVER_BASE_URL}/purchased?userId=${userId}`
    );
  }

  purchasedFilm(movie: any, userId: number): Observable<any> {
    const movieWithUserId = { ...movie, userId };
    if (!this.purchased.some((pur) => pur.id === movie.id)) {
      this.purchased.push(movie);
      console.log('Film aggiunto ai preferiti:', movie);
      return this.http.post<any>(
        `${environment.JSON_SERVER_BASE_URL}/purchased`,
        movieWithUserId
      );
    } else {
      console.log('Il film è già nei preferiti:', movie);
      return Observable.create();
    }
  }
  refundFilm(filmId: number, userId: number): Observable<any> {
    return this.http.delete<any>(
      `${environment.JSON_SERVER_BASE_URL}/purchased/${filmId}?userId=${userId}`
    );
  }
}
