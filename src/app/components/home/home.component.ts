import { Component, OnInit } from '@angular/core';
import { FilmService } from 'src/app/services/film.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  popularFilms?: any[];
  upComingFilms?: any[];
  nowPlayingFilms?: any[];

  popularStartIndex: number = 0;
  upComingStartIndex: number = 0;
  nowPlayingStartIndex: number = 0;

  filmsToShow: number = 5;

  constructor(
    private filmService: FilmService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.getPopular();
    this.getUpcoming();
  }

  getUpcoming() {
    this.filmService.getTmdbUpcoming().subscribe((data) => {
      this.upComingFilms = data.results;
    });
  }

  getPopular() {
    this.filmService.getTmdbPopular().subscribe((data) => {
      this.popularFilms = data.results;
    });
  }

  //codice per la img
  getMoviePosterUrl(posterPath: string): string {
    if (posterPath) {
      return `https://image.tmdb.org/t/p/w500/${posterPath}`;
    } else {
      return 'https://via.placeholder.com/150';
    }
  }

  getVisibleFilms(startIndex: number, films: any[]): any[] {
    //verifica per assicurarti che films non sia undefined
    if (films && films.length > 0) {
      return films.slice(startIndex, startIndex + this.filmsToShow);
    } else {
      return [];
    }
  }

  //gestione generale del previous button
  loadPreviousFilms(startIndex: number, films: any[]): void {
    startIndex = Math.max(0, startIndex - this.filmsToShow);
    if (startIndex === 0) {
      startIndex = films!.length - this.filmsToShow;
    }

    if (films === this.popularFilms) {
      this.popularStartIndex = startIndex;
    } else if (films === this.upComingFilms) {
      this.upComingStartIndex = startIndex;
    }
  }

  //gestione generale del next button
  loadNextFilms(startIndex: number, films: any[]): void {
    if (startIndex + this.filmsToShow < films!.length) {
      startIndex += this.filmsToShow;
    } else {
      startIndex = 0;
    }

    if (films === this.popularFilms) {
      this.popularStartIndex = startIndex;
    } else if (films === this.upComingFilms) {
      this.upComingStartIndex = startIndex;
    }
  }

  //applico ad ogni button le istruzioni generali
  loadPreviousPopularFilms() {
    this.loadPreviousFilms(this.popularStartIndex, this.popularFilms!);
  }

  loadNextPopularFilms() {
    this.loadNextFilms(this.popularStartIndex, this.popularFilms!);
  }

  loadPreviousUpComingFilms() {
    this.loadPreviousFilms(this.upComingStartIndex, this.upComingFilms!);
  }

  loadNextUpComingFilms() {
    this.loadNextFilms(this.upComingStartIndex, this.upComingFilms!);
  }

  getVisibleFilmsGeneric(startIndex: number, films: any[]): any[] {
    if (films && films.length > 0) {
      return films.slice(startIndex, startIndex + this.filmsToShow);
    } else {
      return [];
    }
  }
}
