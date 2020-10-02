import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  API_KEY = 'YOUR_API_KEY';
  constructor(private httpClient: HttpClient) { }

  public getCustomers(){
    return this.httpClient.get(`http://localhost:9090/customers`);
  }

  public getProducts(){
    return this.httpClient.get(`http://localhost:9090/products`);
  }

  public getProductCategory(){
    return this.httpClient.get(`http://localhost:9090/productcategory`);
  }

  public login(userdata){
    return this.httpClient.post(`http://localhost:9090/useraccount/login`, JSON.stringify(userdata));
  }

  public getUser(id){
    return this.httpClient.get(`http://localhost:9090/useraccount/` + id);
  }
}
