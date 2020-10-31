import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Product } from '../_models/product';

@Injectable({ providedIn: 'root' })
export class ProductService {
    constructor(private http: HttpClient) { }
    
    getProducts(){
        return this.http.get(`http://localhost:9090/products`);
    }
    
    getProduct(id: number){
        return this.http.get(`http://localhost:9090/products/${id}`);
    }

    addProduct(product: Product) {
        return this.http.post(`http://localhost:9090/products`, product);
    }

    update(product: Product) {
        return this.http.put(`http://localhost:9090/products`, product);
    }

    delete(id: number) {
        return this.http.delete(`http://localhost:9090/products/${id}`);
    }
}