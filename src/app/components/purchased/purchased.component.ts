import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { FilmService } from 'src/app/services/film.service';
import { PurchasedServiceService } from 'src/app/services/purchased-service.service';

@Component({
  selector: 'app-purchased',
  templateUrl: './purchased.component.html',
  styleUrls: ['./purchased.component.css'],
})
export class PurchasedComponent implements OnInit {
  films: any;

  constructor(
    private purchasedService: PurchasedServiceService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.films = this.purchasedService.getPurchased();
  }
}
