import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { TranslateService } from '@ngx-translate/core';
 
@Injectable({ providedIn: 'root' })
export class LangService {
    private lang = new Subject<any>();
 
    chnagetolang(product:string){
      console.log('call');
      this.lang.next({lang:product});
    }
    
    getlang(): Observable<any>{
      return this.lang.asObservable();
    }
 

 
}