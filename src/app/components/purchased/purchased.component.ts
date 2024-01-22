import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { FilmService } from 'src/app/services/film.service';
import { PurchasedServiceService } from 'src/app/services/purchased-service.service';

@Component({
  selector: 'app-purchased',
  templateUrl: './purchased.component.html',
  styleUrls: ['./purchased.component.css'],
})
export class PurchasedComponent implements OnInit {
  purchasedFilms: any[] = [];

  constructor(
    private purchasedService: PurchasedServiceService,
    private route: ActivatedRoute,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.addPurchasedFilm();
  }

  addPurchasedFilm() {
    const userId = this.authService.getLoggedUserId();
    if (userId !== null && userId !== undefined) {
      this.purchasedService.getPurchased(userId).subscribe(
        (films) => {
          this.purchasedFilms = films;
          console.log('Film acquistati:', this.purchasedFilms);
        },
        (error) => {
          console.error(
            'Errore durante il recupero dei film acquistati:',
            error
          );
        }
      );
    } else {
      console.error('ID utente non valido.');
    }
  }
}
