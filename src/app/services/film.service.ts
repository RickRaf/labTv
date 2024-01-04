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

  getJsonServerData(): Observable<any> {
    const url = `${environment.JSON_SERVER_BASE_URL}/tuoEndpoint`;
    return this.http.get(url);
  }

  getTmdbPopular(): Observable<any> {
    const url = `${environment.tmdbBaseUrl}/movie/popular?api_key=${environment.FILM_API_KEY}`;
    const headers = new HttpHeaders({
      Authorization: `Bearer ${environment.FILM_ACCESS_TOKEN}`,
    });

    return this.http.get(url, { headers });
  }

  getTmdbTopRated(): Observable<any> {
    const url = `${environment.tmdbBaseUrl}/movie/top_rated?api_key=${environment.FILM_API_KEY}`;
    const headers = new HttpHeaders({
      Authorization: `Bearer ${environment.FILM_ACCESS_TOKEN}`,
    });

    return this.http.get(url, { headers });
  }

  getTmdbUpcoming(): Observable<any> {
    const url = `${environment.tmdbBaseUrl}/movie/upcoming?api_key=${environment.FILM_API_KEY}`;
    const headers = new HttpHeaders({
      Authorization: `Bearer ${environment.FILM_ACCESS_TOKEN}`,
    });

    return this.http.get(url, { headers });
  }
}
