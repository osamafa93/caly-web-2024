import { Component } from '@angular/core';
import { RestService } from 'src/app/services/rest.service';
import { LoaderService } from 'src/app/loader.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { DesimalnumberPipe } from 'src/app/Pipes/Desimalnumber.pipe';
import {TranslateService} from '@ngx-translate/core';
import * as $ from 'jquery';
import { Subscription } from 'rxjs';
import { NotificationService } from 'src/app/notification.service';
@Component({
  selector: 'app-confirm-payment',
  templateUrl: './confirm-payment.component.html',
  styleUrls: ['./confirm-payment.component.scss']
})
export class ConfirmPaymentComponent {
      subscription: Subscription | undefined;
	popshow:any='0';
	confirorderdata:any='';
	Userdata:any='';
      loadershow:any=0;
	vat_percentage:any='';
	delivery_charges:any='';
	offer_price:any='';
	vat_price:any='';
	total:any='';
      sub_total:any='';
      servicedata:any = [];
      isLogin:any= localStorage.getItem("IsLogin");

      payementHendleId:any='';
	constructor(private translate: TranslateService,private notiser:NotificationService,private toastr: ToastrService,public router: Router,public rest: RestService,private loaderService: LoaderService)
	{
            
            if(this.isLogin!='1'){
                  this.router.navigate(['/user']);
            }
		this.Userdata=JSON.parse(localStorage.getItem('userData') || '{}');
		this.confirorderdata=JSON.parse(localStorage.getItem('confirmdata') || '{}');
		this.Mycalculationfun();
	}
      popopenfun(type:any){
            this.popshow=type;
      }

	Mycalculationfun()
      {
            this.rest.serverdataget("myCartCalculation?customer_id="+this.Userdata.customer_id).subscribe( res => {
                  let data:any=res;
                  this.loaderService.chnagetolloader('false');
                  if(data.status==true)
                  {
				this.vat_percentage=data.vat_percentage;
				this.delivery_charges=data.delivery_charges;
				this.offer_price=data.offer_price;
				this.vat_price=data.vat_price;
				this.total=data.total;
                        this.sub_total=data.sub_total;
                  }
 
            },error => {
                  console.log(error);
                  this.loaderService.chnagetolloader('false');
            });
      }
	
      continueShoping(){
      
            this.servicedata = [];
            this.loaderService.chnagetolloader('true');
            this.servicedata.push({"customer_id":this.Userdata.customer_id});
            this.servicedata.push({"business_vat_number":this.confirorderdata.vat_number});
            this.servicedata.push({"payment_mode":this.confirorderdata.paymentMode});
            this.servicedata.push({"delivery_day":this.confirorderdata.senddate});
            this.servicedata.push({"delivery_time":'From 9 AM to 11 PM'});
            this.servicedata.push({"product_available_option":this.confirorderdata.reson});
            this.servicedata.push({"final_payable_amount":this.confirorderdata.total_cost});
            this.servicedata.push({"wallet_amount":this.confirorderdata.usewallet_amount});
            this.servicedata.push({"wallet_status":this.confirorderdata.walletyesno});
            this.servicedata.push({"delivery_location_id":this.confirorderdata.location_id});
            this.rest.serverdataposttwo("confirmOrder",this.servicedata).subscribe( res => {
                  let data:any=res;
                  this.popshow=0;
                  this.loaderService.chnagetolloader('false');
                 this.Mycalculationfun();
                 this.notiser.chnagetolloader('true');
                  if(data.status==true)
                  {
                        if(data.id==''){
                              this.getPaymentHendal(data.payment_url);
                              localStorage.setItem('order_id',data.data.id)
                        }
                        else {
                              localStorage.removeItem("confirmdata");
                              localStorage.setItem('order_id',data.data.id)
                              this.rest.translatetsfiledata('Your_order_has_been_placed_successfully','Success');
                              this.loaderService.chnagetolloader('false');
                              this.router.navigate(["/user/payment-successfully"]);
                        }
                  }
                  else{
                        
                  }
            },error => {
                  this.loaderService.chnagetolloader('false');
            });     
      }


      getPaymentHendal(sendurl:any)
      {
            this.loaderService.chnagetolloader('true');
            this.rest.serverdataget("paymentHandle?user_id="+this.Userdata.customer_id).subscribe( res => {
                  let data:any=res;
                 
                  this.loaderService.chnagetolloader('false');
                  if(data.status==true)
                  {
                        localStorage.setItem("Order_get_id",data.data.id);
                        document.location.href=sendurl;
                  }
                  else{
                       
                  }    
            },error => {
                  console.log(error);
                  this.loaderService.chnagetolloader('false');
            });
            
      }
      

}
