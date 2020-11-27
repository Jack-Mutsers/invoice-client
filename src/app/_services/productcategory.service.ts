import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ProductCategory } from '../_models/productcategory';
import { map } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class ProductCategoryService {
    constructor(private http: HttpClient) { }
    
    getProductCategorys(){
        return this.http.get<any>(`http://localhost:9090/productcategory`)
        .pipe(map(response => {
            if(response.status){
                return response.body;
            }
        }));
    }
    
    getProductCategory(id: number){
        return this.http.get<any>(`http://localhost:9090/productcategory/${id}`)
        .pipe(map(response => {
            if(response.status){
                return response.body;
            }
        }));
    }

    addProductCategory(productcategory: ProductCategory) {
        return this.http.post<any>(`http://localhost:9090/productcategory`, productcategory);
    }

    update(productcategory: ProductCategory) {
        return this.http.put<any>(`http://localhost:9090/productcategory`, productcategory);
    }

    delete(id: number) {
        return this.http.delete<any>(`http://localhost:9090/productcategory/${id}`);
    }
}