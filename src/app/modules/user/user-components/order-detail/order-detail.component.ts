import { Component,OnInit } from '@angular/core';
import { RestService } from 'src/app/services/rest.service';
import { LoaderService } from 'src/app/loader.service';
import { Router } from '@angular/router';
import * as $ from 'jquery';
import { ToastrService } from 'ngx-toastr';
import {TranslateService} from '@ngx-translate/core';
@Component({
  selector: 'app-order-detail',
  templateUrl: './order-detail.component.html',
  styleUrls: ['./order-detail.component.scss']
})
export class OrderDetailComponent implements OnInit{
      
      direction:any='';
      order_id:any='';
      order_reference_id:any='';
      order_status:any='';
      order_created_by:any='';
      created_at:any='';
      delivery_day:any='';
      delivery_date:any='';
      delivery_time:any='';
      promo_code_amount:any='';
      alternate_payment_mode:any='';
      remaining_amount:any='';
      discount_price:any='';
      sub_total:any='';
      delivery_charges:any='';
      total:any='';
      vat_percent:any='';
      payment_status:any='';
      payment_mode:any='';
      vat_price:any='';
      offer_price:any='';
      Shipments:any='';
      url:any='';

      Userdata:any='';

      shipmentsList:any=[];
      servicedata:any = [];
      isLogin:any= localStorage.getItem("IsLogin");
      constructor(private translate: TranslateService,private toastr: ToastrService,public router: Router,public rest: RestService,private loaderService: LoaderService)
      {
            this.translate.setDefaultLang('en');
		this.Userdata=JSON.parse(localStorage.getItem('userData') || '{}');
            this.loadfun();
      }

      loadfun()
      {
           
            this.loaderService.chnagetolloader('true');
            this.rest.serverdataget("myOrdersDetail?order_id="+localStorage.getItem('order_id')).subscribe( res => {
                  let data:any=res;
                  this.loaderService.chnagetolloader('false');
                  if(data.status==true)
                  {
                        this.order_id=data.data.order_id;
                        this.order_reference_id=data.data.order_reference_id;
                        this.order_status=data.data.order_status;
                        this.order_created_by=data.data.order_created_by;
                        this.created_at=data.data.created_at
                        this.delivery_day=data.data.delivery_day;
                        this.delivery_date=data.data.delivery_date;
                        this.delivery_time=data.data.delivery_time
                        this.promo_code_amount=data.data.promo_code_amount
                        this.alternate_payment_mode=data.data.alternate_payment_mode;
                        this.remaining_amount=data.data.remaining_amount;
                        this.discount_price=data.data.discount_price;
                        this.sub_total=data.data.sub_total;
                        this.delivery_charges=data.data.delivery_charges;
                        this.total=data.data.total;
                        this.vat_percent=data.data.vat_percent;
                        this.payment_status=data.data.payment_status;
                        this.payment_mode=data.data.payment_mode;
                        this.vat_price=data.data.vat_price;
                        this.offer_price=data.data.offer_price;
                        this.Shipments=data.data.Shipments;
                        this.url=data.data.url;
                        
                        this.shipmentsList=data.shipmentsList;
                  }
                  else{
                        this.shipmentsList=[];
                  }    
            },error => {
                  console.log(error);
                  this.loaderService.chnagetolloader('false');
            });
      }
      ngOnInit(): void {
            
            if(this.isLogin!='1'){
                  this.router.navigate(['/user']);
            }
		this.translate.addLangs(['en', 'ar','zh','ur']);
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
      orderInvoicefun()
      { 
            window.open(this.url);
      }
}
