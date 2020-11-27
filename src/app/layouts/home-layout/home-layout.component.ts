import { Component } from '@angular/core';
import { AuthenticationService } from './../../_services/authentication.service';

@Component({
  selector: 'app-home-layout',
  templateUrl: './home-layout.component.html',
  styleUrls: ['./home-layout.component.css']
})

export class HomeLayoutComponent {

  constructor(private authService: AuthenticationService) { }

  onLogout() {
    this.authService.logout();
  }
}