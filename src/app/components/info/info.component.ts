import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { FilmService } from 'src/app/services/film.service';

@Component({
  selector: 'app-info',
  templateUrl: './info.component.html',
  styleUrls: ['./info.component.css'],
})
export class InfoComponent implements OnInit {
  getInfoResult: any;
  getTrailerResult: any;
  getCastResult: any;
  constructor(
    private filmService: FilmService,
    private router: ActivatedRoute
  ) {}

  ngOnInit(): void {
    let Id = this.router.snapshot.paramMap.get('id');
    this.getInfo(Id);
    this.getCast(Id);
    this.getTrailer(Id);
  }

  getInfo(id: any) {
    this.filmService.getInfoFilm(id).subscribe((data) => {
      this.getInfoResult = data;
    });
  }

  getTrailer(id: any) {
    this.filmService.getTrailerFilm(id).subscribe((data) => {
      console.log('Risposta dalla chiamata:', data);

      // Verifica se la proprietà 'results' è definita e se è un array non vuoto
      if (
        data.results &&
        Array.isArray(data.results) &&
        data.results.length > 0
      ) {
        data.results.forEach((result: any) => {
          // Verifica se l'elemento ha la proprietà 'type' e se è 'Trailer'
          if (result.type === 'Trailer') {
            console.log('Result key:', result.key);

            this.getTrailerResult = result.key;
          }
        });
      } else {
        console.error(
          'La proprietà results in data non è definita o è un array vuoto.'
        );
      }
    });
  }

  getCast(id: any) {
    this.filmService.getCastFilm(id).subscribe((data) => {
      this.getCastResult = data.cast;
    });
  }

  openTrailer(videoKey: string): void {
    const url = `https://www.themoviedb.org/video/play?key=${videoKey}`;
    window.open(url, '_blank');
  }
}
