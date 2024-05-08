import { Component,OnInit } from '@angular/core';
import { RestService } from 'src/app/services/rest.service';
import { LoaderService } from 'src/app/loader.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import {TranslateService} from '@ngx-translate/core';
import * as $ from 'jquery';

@Component({
  selector: 'app-payment-successfully',
  templateUrl: './payment-successfully.component.html',
  styleUrls: ['./payment-successfully.component.scss']
})
export class PaymentSuccessfullyComponent implements OnInit{

      Userdata:any='';
      payementHendleId:any='';
      paymentStatus:any='';
      total_initial_amount:any='';

      transaction_id:any='';
      popshow:any=true;
      constructor(private translate: TranslateService,private toastr: ToastrService,public router: Router,public rest: RestService,private loaderService: LoaderService){
            this.Userdata=JSON.parse(localStorage.getItem('userData') || '{}');
         
            this.getFetchformPayment();
      }

      ngOnInit(): void {
     
      }

      getFetchformPayment()
      {
            this.loaderService.chnagetolloader('true');
            this.rest.serverdataget("fetchFromPaymentHandle?payment_handles_id="+localStorage.getItem("Order_get_id")).subscribe( res => {
                  let data:any=res;
                  this.loaderService.chnagetolloader('false');
                  if(data.status==true)
                  {
                        this.paymentStatus=data.status;
                        this.transaction_id=data.data.transaction_id;
                  }
                  else{
                       
                  }    
            },error => {
                  console.log(error);
                  this.loaderService.chnagetolloader('false');
            });
            
      }
}
