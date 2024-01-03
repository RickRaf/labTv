import { Component, OnInit } from '@angular/core';
import { FilmService } from 'src/app/services/film.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  films?: any[];
  startIndex: number = 0;
  filmsToShow: number = 5;

  constructor(
    private filmService: FilmService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.getPopular();
  }

  getPopular() {
    this.filmService.getTmdbData().subscribe((data) => {
      this.films = data.results;
    });
  }

  getMoviePosterUrl(posterPath: string): string {
    if (posterPath) {
      return `https://image.tmdb.org/t/p/w500/${posterPath}`;
    } else {
      return 'https://via.placeholder.com/150';
    }
  }

  get visibleFilms(): any[] {
    return this.films!.slice(
      this.startIndex,
      this.startIndex + this.filmsToShow
    );
  }

  loadPreviousFilms() {
    // Riduci l'indice di partenza per mostrare film precedenti
    this.startIndex = Math.max(0, this.startIndex - this.filmsToShow);

    //logica per rendere lo scroll infinito
    if (this.startIndex === 0) {
      this.startIndex = this.films!.length - this.filmsToShow;
    }
  }

  loadNextFilms() {
    // Aumenta l'indice di partenza per mostrare film successivi
    if (this.startIndex + this.filmsToShow < this.films!.length) {
      this.startIndex += this.filmsToShow;
    } else {
      //logica per rendere lo scroll infinito
      this.startIndex = 0;
    }
  }
}
