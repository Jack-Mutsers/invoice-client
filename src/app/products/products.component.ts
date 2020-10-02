import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { Product } from '../_models/product';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

  products: Product[];

  constructor(private apiService: ApiService) { }

  ngOnInit(): void {
    this.apiService.getProducts().subscribe((data)=>{
      console.log(data);
      this.products = <Product[]> data;
    });
  }
}
