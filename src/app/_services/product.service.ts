import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Product } from '../_models/product';
import { map } from 'rxjs/operators';
import { environment } from './../../environments/environment';

@Injectable({ providedIn: 'root' })
export class ProductService {
    private apiUrl: string = window["env"]["apiUrl"];
	private SERVER_URL: string = "http://"+ this.apiUrl +"/products";
    constructor(private http: HttpClient) { }
    
    getProducts(){
        return this.http.get<any>(this.SERVER_URL)
        .pipe(map(response => {
            if(response.status){
                return response.body;
            }
        }));
    }
    
    getProduct(id: number){
        return this.http.get<any>(this.SERVER_URL + `/${id}`)
        .pipe(map(response => {
            if(response.status){
                return response.body;
            }
        }));
    }

    addProduct(product: Product) {
        return this.http.post<any>(this.SERVER_URL, product);
    }

    update(product: Product) {
        return this.http.put<any>(this.SERVER_URL, product);
    }

    delete(id: number) {
        return this.http.delete<any>(this.SERVER_URL + `/${id}`);
    }
}