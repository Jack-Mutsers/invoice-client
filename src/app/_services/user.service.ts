import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Useraccount } from '../_models/useraccount';

@Injectable({ providedIn: 'root' })
export class UserService {
    constructor(private http: HttpClient) { }
    
    getUser(id: number){
        return this.http.get(`http://localhost:9090/useraccount/${id}`);
    }

    register(user: Useraccount) {
        return this.http.post(`http://localhost:9090/useraccount/register`, user);
    }

    delete(id: number) {
        return this.http.delete(`http://localhost:9090/useraccount/${id}`);
    }
}