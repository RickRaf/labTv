import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class PurchasedServiceService {
  private purchased: any[] = [];

  getPurchased(): any[] {
    return this.purchased;
  }

  purchasedFilm(movie: any): void {
    if (!this.purchased.some((fav) => fav.id === movie.id)) {
      this.purchased.push(movie);
      console.log('Film aggiunto ai preferiti:', movie);
    } else {
      console.log('Il film è già nei preferiti:', movie);
    }
  }
}
