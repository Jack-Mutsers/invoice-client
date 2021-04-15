import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ProductCategory } from '../_models/productcategory';
import { map } from 'rxjs/operators';
import { environment } from './../../environments/environment';

@Injectable({ providedIn: 'root' })
export class ProductCategoryService {
    private apiUrl: string = window["env"]["apiUrl"];
	private SERVER_URL: string = "http://"+ this.apiUrl +"/productcategory";
    constructor(private http: HttpClient) { }
    
    getProductCategorys(){
        return this.http.get<any>(this.SERVER_URL)
        .pipe(map(response => {
            if(response.status){
                return response.body;
            }
        }));
    }
    
    getProductCategory(id: number){
        return this.http.get<any>(this.SERVER_URL + `/${id}`)
        .pipe(map(response => {
            if(response.status){
                return response.body;
            }
        }));
    }

    addProductCategory(productcategory: ProductCategory) {
        return this.http.post<any>(this.SERVER_URL, productcategory);
    }

    update(productcategory: ProductCategory) {
        return this.http.put<any>(this.SERVER_URL, productcategory);
    }

    delete(id: number) {
        return this.http.delete<any>(this.SERVER_URL + `/${id}`);
    }
}