import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UserAccount } from '../_models/useraccount';
import { map } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class UserService {
    constructor(private http: HttpClient) { }
    
    getUser(id: number){
        return this.http.get<any>(`http://localhost:9090/useraccount/${id}`)
        .pipe(map(response => {
            if(response.status){
                return response.body;
            }
        }));
    }

    register(user: UserAccount) {
        return this.http.post<any>(`http://localhost:9090/useraccount/register`, user);
    }

    delete(id: number) {
        return this.http.delete<any>(`http://localhost:9090/useraccount/${id}`);
    }
}