import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, catchError, map, of } from 'rxjs';
import { environment } from 'src/environments/environment';
import { films, searchFilm } from '../model/filmModel';
import { SafeResourceUrl, DomSanitizer } from '@angular/platform-browser';

@Injectable({
  providedIn: 'root',
})
export class FilmService {
  constructor(private http: HttpClient, private sanitizer: DomSanitizer) {}

  //get json server
  getJsonServerData(): Observable<any> {
    const url = `${environment.JSON_SERVER_BASE_URL}/tuoEndpoint`;
    return this.http.get(url);
  }

  //get api popular
  getTmdbPopular(): Observable<any> {
    const url = `${environment.tmdbBaseUrl}/movie/popular?api_key=${environment.FILM_API_KEY}`;
    const headers = new HttpHeaders({
      Authorization: `Bearer ${environment.FILM_ACCESS_TOKEN}`,
    });

    return this.http.get(url, { headers });
  }

  //get api top rated
  getTmdbAnimation(): Observable<any> {
    const url = `${environment.tmdbBaseUrl}/discover/movie?api_key=${environment.FILM_API_KEY}&with_genres=16`;
    const headers = new HttpHeaders({
      Authorization: `Bearer ${environment.FILM_ACCESS_TOKEN}`,
    });

    return this.http.get(url, { headers });
  }

  //get api comedy
  getTmdbComedy(): Observable<any> {
    const url = `${environment.tmdbBaseUrl}/discover/movie?api_key=${environment.FILM_API_KEY}&with_genres=35`;
    const headers = new HttpHeaders({
      Authorization: `Bearer ${environment.FILM_ACCESS_TOKEN}`,
    });

    return this.http.get(url, { headers });
  }

  //get api thriller
  getTmdbThriller(): Observable<any> {
    const url = `${environment.tmdbBaseUrl}/discover/movie?api_key=${environment.FILM_API_KEY}&with_genres=53`;
    const headers = new HttpHeaders({
      Authorization: `Bearer ${environment.FILM_ACCESS_TOKEN}`,
    });

    return this.http.get(url, { headers });
  }

  //get api info film
  getInfoFilm(data: any): Observable<any> {
    return this.http.get(
      `${environment.tmdbBaseUrl}/movie/${data}?api_key=${environment.FILM_API_KEY}`
    );
  }

  getTrailerFilm(id: any): Observable<SafeResourceUrl | null> {
    const url = `${environment.tmdbBaseUrl}/movie/${id}/videos?api_key=${environment.FILM_API_KEY}`;

    return this.http.get(url).pipe(
      map((data: any) => {
        if (data && data.results && data.results.length > 0) {
          const trailerKey = data.results[0].key;
          return this.getTrailerEmbedUrl(trailerKey);
        } else {
          console.error('Nessun trailer disponibile.');
          return null;
        }
      }),
      catchError((error) => {
        console.error('Errore nel recupero del trailer:', error);
        return of(null);
      })
    );
  }

  private getTrailerEmbedUrl(videoKey: string): SafeResourceUrl {
    const url = `https://www.youtube.com/embed/${videoKey}`;
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }

  //get cast
  getCastFilm(data: any): Observable<any> {
    return this.http.get(
      `${environment.tmdbBaseUrl}/movie/${data}/credits?api_key=${environment.FILM_API_KEY}`
    );
  }
}
