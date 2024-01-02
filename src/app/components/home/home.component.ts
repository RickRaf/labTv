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
  carouselFilm?: any[];
  constructor(
    private filmService: FilmService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.getPopular();
    this.getTopRated();
  }

  getTopRated() {
    this.filmService.getTmdbTopRated().subscribe((data) => {
      this.carouselFilm = data.results;
    });
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
}
