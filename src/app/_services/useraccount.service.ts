import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UserAccount } from '../_models/useraccount';
import { map } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class UserAccountService {
    constructor(private http: HttpClient) { }
        
    addUserAccount(useraccount: UserAccount) {
        console.log(JSON.stringify(useraccount));
        return this.http.post<any>(`http://localhost:9090/useraccount`, useraccount)
        .pipe(map(response => {
            if(response.status){
                return response.body;
            }
        }));
    }

    update(id: number, useraccount: UserAccount) {
        return this.http.put<any>(`http://localhost:9090/useraccount/${id}`, useraccount)
        .pipe(map(response => {
            if(response.status){
                return response.body;
            }
        }));
    }

    delete(id: number) {
        return this.http.delete<any>(`http://localhost:9090/useraccount/${id}`)
        .pipe(map(response => {
            if(response.status){
                return response.body;
            }
        }));
    }
}