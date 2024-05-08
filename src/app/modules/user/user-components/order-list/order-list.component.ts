import { Component,OnInit } from '@angular/core';
import { RestService } from 'src/app/services/rest.service';
import { LoaderService } from 'src/app/loader.service';
import {TranslateService} from '@ngx-translate/core';
import { Router } from '@angular/router';
import * as $ from 'jquery';
@Component({
  selector: 'app-order-list',
  templateUrl: './order-list.component.html',
  styleUrls: ['./order-list.component.scss']
})
export class OrderListComponent implements OnInit{

      direction:any='';
      loaddatashow:any=3;
      Userdata:any='';
      orderList:any=[];
      isLogin:any= localStorage.getItem("IsLogin");
      constructor(private translate: TranslateService,public router: Router,public rest: RestService,private loaderService: LoaderService)
      {
            this.translate.setDefaultLang('en');
            this.Userdata=JSON.parse(localStorage.getItem('userData') || '{}');
            this.loadfun();
      }

      loadfun()
      {
            this.loaderService.chnagetolloader('true');
            this.rest.serverdataget("myOrders?customer_id="+this.Userdata.customer_id).subscribe( res => {
                  let data:any=res;
                  this.loaddatashow=1;
                  this.loaderService.chnagetolloader('false');
                  if(data.status==true)
                  {
                        this.orderList= data.data;
                  }
                  else{
                        this.loaddatashow=0;
                        this.orderList=[];
                  }    
            },error => {
                  console.log(error);
                  this.loaderService.chnagetolloader('false');
            });
      }
      ngOnInit(): void {
		
            // if(this.isLogin!='1'){
            //       this.router.navigate(['/user']);
            // }
            if (localStorage.getItem('DefaultLang') == 'en') {
                  this.translate.setDefaultLang('en');
            } 
            else if (localStorage.getItem('DefaultLang') == 'ar') {
                  this.translate.setDefaultLang('ar');
                  document.dir = this.direction;
            } 
            else if (localStorage.getItem('DefaultLang') == 'zh'){
                  
                  this.translate.setDefaultLang('zh');
            }else {

                  this.translate.setDefaultLang('ur');
            }
	}
      orderDetailspage(order_id:any){
            localStorage.setItem('order_id',order_id);
            this.router.navigate(["/user/order-detail"]);
      }
}
