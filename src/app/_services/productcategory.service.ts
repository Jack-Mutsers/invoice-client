import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ProductCategory } from '../_models/productcategory';

@Injectable({ providedIn: 'root' })
export class ProductCategoryService {
    constructor(private http: HttpClient) { }
    
    getProductCategorys(){
        return this.http.get(`http://localhost:9090/productcategory`);
    }
    
    getProductCategory(id: number){
        return this.http.get(`http://localhost:9090/productcategory/${id}`);
    }

    addProductCategory(productcategory: ProductCategory) {
        return this.http.post(`http://localhost:9090/productcategory`, productcategory);
    }

    update(id: number, productcategory: ProductCategory) {
        return this.http.put(`http://localhost:9090/productcategory/${id}`, productcategory);
    }

    delete(id: number) {
        return this.http.delete(`http://localhost:9090/productcategory/${id}`);
    }
}