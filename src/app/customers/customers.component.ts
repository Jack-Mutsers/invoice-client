import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.css']
})

export class CustomersComponent implements OnInit {
  customers: Customer[];

  constructor(private apiService: ApiService) { }

  ngOnInit(): void {
    this.apiService.getCustomers().subscribe((data)=>{
      console.log(data);
      this.customers = <Customer[]> data;
    });
  }

}

export interface Customer{
  id: number;
  name: string;
  address: string;
  zipcode: string;
  city: string;
}