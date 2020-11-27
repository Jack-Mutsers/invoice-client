import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Product } from '../_models/product';
import { map } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class ProductService {
    constructor(private http: HttpClient) { }
    
    getProducts(){
        return this.http.get<any>(`http://localhost:9090/products`)
        .pipe(map(response => {
            if(response.status){
                return response.body;
            }
        }));
    }
    
    getProduct(id: number){
        return this.http.get<any>(`http://localhost:9090/products/${id}`)
        .pipe(map(response => {
            if(response.status){
                return response.body;
            }
        }));
    }

    addProduct(product: Product) {
        return this.http.post<any>(`http://localhost:9090/products`, product);
    }

    update(product: Product) {
        return this.http.put<any>(`http://localhost:9090/products`, product);
    }

    delete(id: number) {
        return this.http.delete<any>(`http://localhost:9090/products/${id}`);
    }
}