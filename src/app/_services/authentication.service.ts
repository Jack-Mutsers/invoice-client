import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { UserAccount } from '../_models';

@Injectable({ providedIn: 'root' })
export class AuthenticationService {
    private currentUserSubject: BehaviorSubject<UserAccount>;
    private currentUserToken: BehaviorSubject<String>;
    public currentUser: Observable<UserAccount>;

    constructor(private http: HttpClient) {
        this.currentUserSubject = new BehaviorSubject<UserAccount>(JSON.parse(localStorage.getItem('currentUser')));
        this.currentUserToken = new BehaviorSubject<String>(JSON.parse(localStorage.getItem('userToken')));
        this.currentUser = this.currentUserSubject.asObservable();
    }

    public get currentUserValue(): UserAccount {
        return this.currentUserSubject.value;
    }

    public get currentUserTokenValue(): String {
        return this.currentUserToken.value;
    }

    login(username: string, password: string) {
        var authdata = `Basic ${btoa(username + ':' + password)}`;
        var header = {
            headers: new HttpHeaders()
            .set('Authorization', authdata )
            // withCredentials: true
        }

        return this.http.post<any>(`http://localhost:9090/authenticate`, null, header)
            .pipe(map(response => {
                var user = response.body;
                if (user && user.token){
                    this.currentUserToken.next(user.token);

                    // store user details and basic auth credentials in local storage to keep user logged in between page refreshes
                    user.authdata = authdata;
                    localStorage.setItem('currentUser', JSON.stringify(user));
                    localStorage.setItem('userToken', JSON.stringify(user.token));
                    this.currentUserSubject.next(user);
                    return user;
                }
            }));
    }

    logout() {
        // remove user from local storage to log user out
        localStorage.removeItem('currentUser');
        localStorage.removeItem('userToken');
        this.currentUserSubject.next(null);
        this.currentUserToken.next(null);
    }
}