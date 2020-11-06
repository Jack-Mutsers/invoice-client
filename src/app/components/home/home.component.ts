import { Component, OnInit } from '@angular/core';
import { AlertService, MessageService } from '../../_services';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  loginStatus = "You are not logged in";

  constructor(
    private apiService: MessageService,
    private alertService: AlertService
  ) { }

  ngOnInit(): void {
    var userdata = JSON.parse(localStorage.getItem('currentUser'));

    if(userdata){
      this.loginStatus = "Welkom " + userdata.user.name;
      this.loadNotifications();
    }
  }

  private loadNotifications(){
    // this.apiService.getNotifications().subscribe((data)=>{
    //   this.customers = <Customer[]> data;
    // });
  }

}
