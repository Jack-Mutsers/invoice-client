import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Product } from '../_models/product';
import { map } from 'rxjs/operators';
import { environment } from './../../environments/environment';

@Injectable({ providedIn: 'root' })
export class ProductService {
    constructor(private http: HttpClient) { }
    
    getProducts(){
        return this.http.get<any>(`http://` + environment.apiUrl + `/products`)
        .pipe(map(response => {
            if(response.status){
                return response.body;
            }
        }));
    }
    
    getProduct(id: number){
        return this.http.get<any>(`http://` + environment.apiUrl + `/products/${id}`)
        .pipe(map(response => {
            if(response.status){
                return response.body;
            }
        }));
    }

    addProduct(product: Product) {
        return this.http.post<any>(`http://` + environment.apiUrl + `/products`, product);
    }

    update(product: Product) {
        return this.http.put<any>(`http://` + environment.apiUrl + `/products`, product);
    }

    delete(id: number) {
        return this.http.delete<any>(`http://` + environment.apiUrl + `/products/${id}`);
    }
}