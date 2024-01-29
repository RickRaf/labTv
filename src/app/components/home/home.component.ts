import { Component, OnInit } from '@angular/core';
import { FilmService } from 'src/app/services/film.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  comedyFilms?: any[];
  thrillerFilms?: any[];
  animationFilms?: any[];

  comedyStartIndex: number = 0;
  thrillerStartIndex: number = 0;
  animationStartIndex: number = 0;

  filmsToShow: number = 5;

  constructor(
    private filmService: FilmService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.getThriller();
    this.getComedy();
    this.getAnimation();
  }

  getComedy() {
    this.filmService.getTmdbComedy().subscribe((data) => {
      this.comedyFilms = data.results;
    });
  }

  getThriller() {
    this.filmService.getTmdbThriller().subscribe((data) => {
      this.thrillerFilms = data.results;
    });
  }

  getAnimation() {
    this.filmService.getTmdbAnimation().subscribe((data) => {
      this.animationFilms = data.results;
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
      startIndex = films.length - this.filmsToShow;
    }

    if (films === this.comedyFilms) {
      this.comedyStartIndex = startIndex;
    } else if (films === this.thrillerFilms) {
      this.thrillerStartIndex = startIndex;
    } else if (films === this.animationFilms) {
      this.animationStartIndex = startIndex;
    }
  }

  //gestione generale del next button
  loadNextFilms(startIndex: number, films: any[]): void {
    if (startIndex + this.filmsToShow < films.length) {
      startIndex += this.filmsToShow;
    } else {
      startIndex = 0;
    }

    if (films === this.comedyFilms) {
      this.comedyStartIndex = startIndex;
    } else if (films === this.thrillerFilms) {
      this.thrillerStartIndex = startIndex;
    } else if (films === this.animationFilms) {
      this.animationStartIndex = startIndex;
    }
  }

  //applico ad ogni button le istruzioni generali
  loadPreviousComedyFilms() {
    this.loadPreviousFilms(this.comedyStartIndex, this.comedyFilms!);
  }

  loadNextComedyFilms() {
    this.loadNextFilms(this.comedyStartIndex, this.comedyFilms!);
  }

  loadPreviousThrillerFilms() {
    this.loadPreviousFilms(this.thrillerStartIndex, this.thrillerFilms!);
  }

  loadNextThrillerFilms() {
    this.loadNextFilms(this.thrillerStartIndex, this.thrillerFilms!);
  }

  loadPreviousAnimationFilms() {
    this.loadPreviousFilms(this.animationStartIndex, this.animationFilms!);
  }

  loadNextAnimationFilms() {
    this.loadNextFilms(this.animationStartIndex, this.animationFilms!);
  }

  getVisibleFilmsGeneric(startIndex: number, films: any[]): any[] {
    if (films && films.length > 0) {
      return films.slice(startIndex, startIndex + this.filmsToShow);
    } else {
      return [];
    }
  }
}
