import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class FilmService {
  private jsonServerBaseUrl = environment.JSON_SERVER_BASE_URL;
  private filmApiKey = environment.FILM_API_KEY;
  private filmAccessToken = environment.FILM_ACCESS_TOKEN;
  private tmdbBaseUrl = environment.tmdbBaseUrl;

  constructor(private http: HttpClient) {}

  getJsonServerData(): Observable<any> {
    const url = `${this.jsonServerBaseUrl}/tuoEndpoint`;
    return this.http.get(url);
  }

  getTmdbData(): Observable<any> {
    const url = `${this.tmdbBaseUrl}/movie/popular?api_key=${this.filmApiKey}`;
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.filmAccessToken}`,
    });

    return this.http.get(url, { headers });
  }

  getTmdbTopRated(): Observable<any> {
    const url = `${this.tmdbBaseUrl}/movie/top_rated?api_key=${this.filmApiKey}`;
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.filmAccessToken}`,
    });

    return this.http.get(url, { headers });
  }
}
