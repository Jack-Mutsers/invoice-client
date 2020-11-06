import { Component } from '@angular/core';
import { AuthenticationService } from './../../_services/authentication.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {

  constructor(private authService: AuthenticationService) { }

  onLogout() {
    this.authService.logout();
  }
}