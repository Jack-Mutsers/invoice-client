import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Message } from '../_models/message';
import { map } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class MessageService {
    constructor(private http: HttpClient) { }
    
    getNotifications(id: number){
        return this.http.get<any>(`http://localhost:9090/messenger/notifications/${id}`)
        .pipe(map(response => {
            if(response.status){
                return response.body;
            }
        }));
    }
    
    getSendRequests(id: number){
        return this.http.get<any>(`http://localhost:9090/messenger/outgoing/${id}`)
        .pipe(map(response => {
            if(response.status){
                return response.body;
            }
        }));
    }
    
    getIncommingRequests(id: number){
        return this.http.get<any>(`http://localhost:9090/messenger/incomming/${id}`)
        .pipe(map(response => {
            if(response.status){
                return response.body;
            }
        }));
    }

    sendRequest(message: Message) {
        return this.http.post<any>(`http://localhost:9090/messenger`, message);
    }

    update(message: Message) {
        return this.http.put<any>(`http://localhost:9090/messenger`, message);
    }
}