import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

 
@Injectable({ providedIn: 'root' })
export class LoaderService {
      private loader = new Subject<any>();
      
      chnagetolloader(lo:string){
            this.loader.next({loc:lo});
      }
      getloader(): Observable<any>{
            return this.loader.asObservable();
      }

}