import { Component, HostListener } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent {
  navbg: any;

  constructor(public authService: AuthService, private router: Router) {}
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
}
