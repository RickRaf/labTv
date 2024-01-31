import { Component, ElementRef, OnInit, Renderer2 } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, map } from 'rxjs';
import { FilmService } from 'src/app/services/film.service';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { PurchasedServiceService } from 'src/app/services/purchased-service.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-info',
  templateUrl: './info.component.html',
  styleUrls: ['./info.component.css'],
})
export class InfoComponent implements OnInit {
  [x: string]: any;
  getInfoResult: any;
  getTrailerResult: any;
  getCastResult: any;

  constructor(
    private filmService: FilmService,
    private router: ActivatedRoute,
    private sanitizer: DomSanitizer,
    private myIframe: ElementRef,
    private renderer: Renderer2,
    private purchasedService: PurchasedServiceService,
    private authService: AuthService
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
    this.filmService.getTrailerFilm(id).subscribe((trailerResult) => {
      if (trailerResult) {
        this.getTrailerResult = trailerResult;
      } else {
        console.error('Nessun trailer disponibile.');
      }
    });
  }

  getCast(id: any) {
    this.filmService.getCastFilm(id).subscribe((data) => {
      this.getCastResult = data.cast;
    });
  }

  addToPurchased(): void {
    if (this.getInfoResult) {
      console.log('Dati del film:', this.getInfoResult);
      const userId = this.authService.getLoggedUserId();
      if (userId !== null && userId !== undefined) {
        this.purchasedService
          .purchasedFilm(this.getInfoResult, userId)
          .subscribe(
            (response) => {
              console.log('Film aggiunto ai preferiti con successo:', response);
            },
            (error) => {
              console.error("Errore durante l'aggiunta ai preferiti:", error);
            }
          );
      } else {
        console.error('ID utente non valido.');
      }
    } else {
      console.error(
        'Impossibile aggiungere ai preferiti: getInfoResult non definito.'
      );
    }
  }
}
