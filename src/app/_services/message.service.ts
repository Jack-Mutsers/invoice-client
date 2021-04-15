import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Message } from '../_models/message';
import { map } from 'rxjs/operators';
import { environment } from './../../environments/environment';

@Injectable({ providedIn: 'root' })
export class MessageService {
    private apiUrl: string = window["env"]["apiUrl"];
	private SERVER_URL: string = "http://"+ this.apiUrl +"/messenger";
    constructor(private http: HttpClient) { }
    
    getNotifications(id: number){
        return this.http.get<any>(this.SERVER_URL + `/notifications/${id}`)
        .pipe(map(response => {
            if(response.status){
                return response.body;
            }
        }));
    }
    
    getSendRequests(id: number){
        return this.http.get<any>(this.SERVER_URL + `/outgoing/${id}`)
        .pipe(map(response => {
            if(response.status){
                return response.body;
            }
        }));
    }
    
    getIncommingRequests(id: number){
        return this.http.get<any>(this.SERVER_URL + `/incomming/${id}`)
        .pipe(map(response => {
            if(response.status){
                return response.body;
            }
        }));
    }

    sendRequest(message: Message) {
        return this.http.post<any>(this.SERVER_URL, message);
    }

    update(message: Message) {
        return this.http.put<any>(this.SERVER_URL, message);
    }
}