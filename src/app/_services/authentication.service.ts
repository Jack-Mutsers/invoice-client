import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { UserAccount } from '../_models';

@Injectable({ providedIn: 'root' })
export class AuthenticationService {
    private currentUserSubject: BehaviorSubject<UserAccount>;
    public currentUser: Observable<UserAccount>;

    constructor(private http: HttpClient) {
        this.currentUserSubject = new BehaviorSubject<UserAccount>(JSON.parse(localStorage.getItem('currentUser')));
        this.currentUser = this.currentUserSubject.asObservable();
    }

    public get currentUserValue(): UserAccount {
        return this.currentUserSubject.value;
    }

    login(username: string, password: string) {
        var header = {
            headers: new HttpHeaders()
            .set('Authorization',  `Basic ${btoa(username + ':' + password)}`)
        }


        return this.http.post<any>(`http://localhost:9090/useraccount/login`, header)
            .pipe(map(user => {
                if (user /*&& user.token*/) {
                    // store user details and basic auth credentials in local storage to keep user logged in between page refreshes
                    user.authdata = `Basic ${window.btoa(username + ':' + password)}`
                    localStorage.setItem('currentUser', JSON.stringify(user));
                    this.currentUserSubject.next(user);
                    return user;
                }
            }));
    }

    logout() {
        // remove user from local storage to log user out
        localStorage.removeItem('currentUser');
        this.currentUserSubject.next(null);
    }
}