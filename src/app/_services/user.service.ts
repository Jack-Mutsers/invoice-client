import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UserAccount } from '../_models/useraccount';
import { map } from 'rxjs/operators';
import { environment } from './../../environments/environment';

@Injectable({ providedIn: 'root' })
export class UserService {
    constructor(private http: HttpClient) { }
    
    getUser(id: number){
        return this.http.get<any>(`http://` + environment.apiUrl + `/useraccount/${id}`)
        .pipe(map(response => {
            if(response.status){
                return response.body;
            }
        }));
    }

    register(user: UserAccount) {
        return this.http.post<any>(`http://` + environment.apiUrl + `/useraccount/register`, user);
    }

    delete(id: number) {
        return this.http.delete<any>(`http://` + environment.apiUrl + `/useraccount/${id}`);
    }
}