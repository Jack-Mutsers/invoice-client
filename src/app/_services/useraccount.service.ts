import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UserAccount } from '../_models/useraccount';

@Injectable({ providedIn: 'root' })
export class UserAccountService {
    constructor(private http: HttpClient) { }
        
    addUserAccount(useraccount: UserAccount) {
        return this.http.post(`http://localhost:9090/useraccount`, useraccount);
    }

    update(id: number, useraccount: UserAccount) {
        return this.http.put(`http://localhost:9090/useraccount/${id}`, useraccount);
    }

    delete(id: number) {
        return this.http.delete(`http://localhost:9090/useraccount/${id}`);
    }
}