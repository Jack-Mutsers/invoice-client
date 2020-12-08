import { Component, HostListener, OnInit } from '@angular/core';
import { AuthenticationService } from './../../_services/authentication.service';
import { faUserCircle } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-home-layout',
  templateUrl: './home-layout.component.html',
  styleUrls: ['./home-layout.component.css']
})

export class HomeLayoutComponent implements OnInit {
  username: String;
  userIcon = faUserCircle;
  
  constructor(private authService: AuthenticationService) { }
  
  ngOnInit(): void {
    this.username = JSON.parse(localStorage.getItem('currentUser')).user.name;
  }

  onLogout() {
    this.authService.logout();
  }

  /* Set the width of the side navigation to 250px */
  openNav() {
    document.getElementById("mySidenav").style.width = "300px";
  }

  /* Set the width of the side navigation to 0 */
  closeNav() {
    document.getElementById("mySidenav").style.width = "0";
  }

  @HostListener('window:mouseup', ['$event'])
  mouseUp(event){
    var sideNav = document.getElementById("mySidenav");
    if(event.target != sideNav){
      this.closeNav();
    }
  }

}