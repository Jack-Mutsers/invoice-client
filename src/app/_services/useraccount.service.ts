import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UserAccount } from '../_models/useraccount';
import { map } from 'rxjs/operators';
import { environment } from './../../environments/environment';

@Injectable({ providedIn: 'root' })
export class UserAccountService {
    constructor(private http: HttpClient) { }
        
    addUserAccount(useraccount: UserAccount) {
        return this.http.post<any>(`http://` + environment.apiUrl + `/useraccount`, useraccount);
    }

    update(id: number, useraccount: UserAccount) {
        return this.http.put<any>(`http://` + environment.apiUrl + `/useraccount/${id}`, useraccount)
        .pipe(map(response => {
            if(response.status){
                return response.body;
            }
        }));
    }

    delete(id: number, password: string) {
        return this.http.request<any>('delete', `http://` + environment.apiUrl + `/useraccount/${id}`, {body: {password}})
        .pipe(map(response => {
            if(response.status){
                return response.message;
            }
        }));
    }
}