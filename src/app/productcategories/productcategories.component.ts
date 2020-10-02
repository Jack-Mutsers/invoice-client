import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { ProductCategory } from '../_models/productcategory';

@Component({
  selector: 'app-productcategories',
  templateUrl: './productcategories.component.html',
  styleUrls: ['./productcategories.component.css']
})
export class ProductcategoriesComponent implements OnInit {

  productCatogories: ProductCategory[];

  constructor(private apiService: ApiService) { }

  ngOnInit(): void {
    this.apiService.getProductCategory().subscribe((data)=>{
      console.log(data);
      this.productCatogories = <ProductCategory[]> data;
    });
  }

}
