import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root',
})
export class SearchService {
  private searchResultSource = new BehaviorSubject<any>(null);
  searchResult$ = this.searchResultSource.asObservable();

  constructor(private http: HttpClient) {}

  updateSearchResult(result: any) {
    this.searchResultSource.next(result);
  }

  getSearchFilm(data: any): Observable<any> {
    return this.http.get(
      `${environment.tmdbBaseUrl}/search/movie?api_key=${environment.FILM_API_KEY}&query=${data.filmName}`
    );
  }

  searchFilmFromNavbar(data: any): Observable<any> {
    return this.http.get(
      `${environment.tmdbBaseUrl}/search/movie?api_key=${environment.FILM_API_KEY}&query=${data.movieName}`
    );
  }
}
