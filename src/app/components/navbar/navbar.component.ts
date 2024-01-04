import { Component, HostListener } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { FilmService } from 'src/app/services/film.service';
import { SearchService } from 'src/app/services/search.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent {
  navbg: any;

  constructor(
    public authService: AuthService,
    private router: Router,
    private searchService: SearchService
  ) {}
  @HostListener('document:scroll') scrollover() {
    if (document.body.scrollTop > 0 || document.documentElement.scrollTop > 0) {
      this.navbg = {
        'background-color': 'black',
      };
    } else {
      this.navbg = {};
    }
  }
  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }

  searchForm = new FormGroup({
    movieName: new FormControl(null),
  });

  submitForm() {
    this.searchService
      .searchFilmFromNavbar(this.searchForm.value)
      .subscribe((data) => {
        this.searchService.updateSearchResult(data.results);
      });
  }
}
