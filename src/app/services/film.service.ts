import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { films, searchResponse } from '../model/filmModel';

@Injectable({
  providedIn: 'root',
})
export class FilmService {
  constructor(private http: HttpClient) {}

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

  //get api trailer
  getTrailerFilm(data: any): Observable<any> {
    return this.http.get(
      `${environment.tmdbBaseUrl}/movie/${data}/videos?api_key=${environment.FILM_API_KEY}`
    );
  }

  //get cast
  getCastFilm(data: any): Observable<any> {
    return this.http.get(
      `${environment.tmdbBaseUrl}/movie/${data}/credits?api_key=${environment.FILM_API_KEY}`
    );
  }
}
