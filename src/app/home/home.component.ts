import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  loginStatus = "You are not logged in";

  constructor() { }

  ngOnInit(): void {
    var userdata = JSON.parse(localStorage.getItem('currentUser'));

    if(userdata){
      this.loginStatus = "Welkom " + userdata.user.name;
    }
  }

}
