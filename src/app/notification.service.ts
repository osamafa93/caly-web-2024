import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

 
@Injectable({ providedIn: 'root' })
export class NotificationService {
    private notification = new Subject<any>();
 
    chnagetolloader(noti:string){
  
      	this.notification.next({loc:noti});
    }
    getNotification(): Observable<any>{
        return this.notification.asObservable();
    }

}