import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Message } from '../_models/message';

@Injectable({ providedIn: 'root' })
export class MessageService {
    constructor(private http: HttpClient) { }
    
    getNotifications(id: number){
        return this.http.get(`http://localhost:9090/messenger/notifications/${id}`);
    }
    
    getSendRequests(id: number){
        return this.http.get(`http://localhost:9090/messenger/outgoing/${id}`);
    }
    
    getIncommingRequests(id: number){
        return this.http.get(`http://localhost:9090/messenger/incomming/${id}`);
    }

    sendRequest(message: Message) {
        return this.http.post(`http://localhost:9090/messenger`, message);
    }

    update(message: Message) {
        return this.http.put(`http://localhost:9090/messenger`, message);
    }
}