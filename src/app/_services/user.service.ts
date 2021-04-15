import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UserAccount } from '../_models/useraccount';
import { map } from 'rxjs/operators';
import { environment } from './../../environments/environment';

@Injectable({ providedIn: 'root' })
export class UserService {
    private apiUrl: string = window["env"]["apiUrl"];
	private SERVER_URL: string = "http://"+ this.apiUrl +"/useraccount";
    constructor(private http: HttpClient) { }
    
    getUser(id: number){
        return this.http.get<any>(this.SERVER_URL + `/${id}`)
        .pipe(map(response => {
            if(response.status){
                return response.body;
            }
        }));
    }

    register(user: UserAccount) {
        return this.http.post<any>(this.SERVER_URL + `/register`, user);
    }

    delete(id: number) {
        return this.http.delete<any>(this.SERVER_URL + `/useraccount/${id}`);
    }
}