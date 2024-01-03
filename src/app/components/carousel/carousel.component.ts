import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FilmService } from 'src/app/services/film.service';

@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.css'],
})
export class CarouselComponent implements OnInit {
  carouselFilm?: any[];

  constructor(
    private filmService: FilmService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.getTopRated();
  }

  getTopRated() {
    this.filmService.getTmdbTopRated().subscribe((data) => {
      this.carouselFilm = data.results;
    });
  }
}
