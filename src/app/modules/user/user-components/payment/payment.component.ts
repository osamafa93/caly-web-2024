import { Component,OnInit } from '@angular/core';
import { RestService } from 'src/app/services/rest.service';
import { LoaderService } from 'src/app/loader.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { DesimalnumberPipe } from 'src/app/Pipes/Desimalnumber.pipe';
import { DatePipe } from '@angular/common';
import {TranslateService} from '@ngx-translate/core';
import * as $ from 'jquery';
@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.scss'],
  providers: [DatePipe]
})
export class PaymentComponent implements OnInit{
      popshow:any='0';

      locationType:any='';
      servicedata:any = [];
      locationList:any=[];
      Userdata:any='';
      addresstitle:any='';
      total_cost:any='';
      withoutwelletamt:any='';

      walletAmount:any='';
      reson:any='';
      paymentType:any='';
      paymentMode:any='';
      walletyesno:any='';

      phone:any='';

      usewallet_amount:any=0;
	remaining_amount:any=0;
	showpaymentmode:any=0;
      vat_percentage:any=0;

      vat_number:any='';
      currentDate:any = new Date();
      is_riyadh:any='';
      nextfivedate:any=[];
      afterfivedate:any=[];

      errormsg:any=0;
      errrormessage:any='';

      senddate:any='';
      location_id:any='';
      direction:any='';
      isLogin:any= localStorage.getItem("IsLogin");
      constructor(private translate: TranslateService,private toastr: ToastrService,private datePipe: DatePipe,public router: Router,public rest: RestService,private loaderService: LoaderService)
      {
            this.translate.setDefaultLang('en');
		this.Userdata=JSON.parse(localStorage.getItem('userData') || '{}');
            // this.walletAmount=localStorage.getItem('walletAmount');  
            this.currentDate = ''+this.datePipe.transform(this.currentDate, 'yyyy-MM-dd');
            this.loadfun();
            this.Mycalculationfun();
            this.getuserProfile();



            for(let i=0;i<5;i++)
            {

                  if(this.is_riyadh==1){
                        var newdate =  new Date();
                        var date = newdate.getDate()+i;
                        var totaldate = newdate.setDate(date);
                        var value = 5;
                        this.nextfivedate.push({showdate:''+this.datePipe.transform(totaldate, 'd-MMMM-y,EEEE'),senddate: ''+this.datePipe.transform(totaldate, 'yyyy-MM-dd')}); 
                  }
                  else{
                        var newdate =  new Date();
                        var date = newdate.getDate()+i;
                        var totaldate = newdate.setDate(date);
                        var value = 5;
                        var afterdate = newdate.getDate()+value;
                        var aftertotaldate = newdate.setDate(afterdate);
                        this.afterfivedate.push({showdate:''+this.datePipe.transform(aftertotaldate, 'd-MMMM-y,EEEE'),senddate: ''+this.datePipe.transform(aftertotaldate, 'yyyy-MM-dd')});  
                  }

            }
           
      }
      popopenfun(type:any){
            this.popshow=type;
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
      loadfun()
      {
            this.loaderService.chnagetolloader('true');
            this.rest.serverdataget("getAllLocations?customer_id="+this.Userdata.customer_id).subscribe( res => {
                  let data:any=res;
                  this.loaderService.chnagetolloader('false');
                  if(data.status==true)
                  {
                        this.locationList=data.data;
                  }
                  else{
                        this.locationList=[];
                  }    
            },error => {
                  console.log(error);
                  this.loaderService.chnagetolloader('false');
            });
            this.getlocation();
      }

      getlocation()
      {
            this.loaderService.chnagetolloader('true');
            this.rest.serverdataget("getLocation?customer_id="+this.Userdata.customer_id).subscribe( res => {
                  let data:any=res;
                  this.loaderService.chnagetolloader('false');
                  if(data.status==true)
                  {
                       this.addresstitle=data.data.address_title;
                       this.location_id=data.data.address_title;
                  }
                  else{
                        this.locationList=[];
                  }    
            },error => {
                  console.log(error);
                  this.loaderService.chnagetolloader('false');
            });
            
      }
      getuserProfile()
      {
            this.loaderService.chnagetolloader('true');
            this.rest.serverdataget("getCustomerData?customer_id="+this.Userdata.customer_id).subscribe( res => {
                  let data:any=res;
                  this.loaderService.chnagetolloader('false');
                  if(data.status==true)
                  {
                        this.is_riyadh=data.data.is_riyadh;
                        this.walletAmount=data.data.credit_limit;
                        this.phone=data.data.phone;
                  }
                  else{
                        
                  }    
            },error => {
                  console.log(error);
                  this.loaderService.chnagetolloader('false');
            });
           
      }
      Mycalculationfun()
      {
            this.rest.serverdataget("myCartCalculation?customer_id="+this.Userdata.customer_id).subscribe( res => {
                  let data:any=res;
                  this.loaderService.chnagetolloader('false');
                  if(data.status==true)
                  {
                        this.total_cost=data.total;
                        this.withoutwelletamt=data.total;
                  }
 
            },error => {
                  console.log(error);
                  this.loaderService.chnagetolloader('false');
            });
      }

      updateLocation(data:any,type:any)
      {
            this.popshow=0;
            this.locationType=type;
            localStorage.setItem('locationData',JSON.stringify(data));
            localStorage.setItem('locationType',this.locationType);
            this.router.navigate(["/user/map"]);  
      }

      paymentModefun(ty:any){

            this.paymentType=ty;
            if(this.paymentType==1){
                  this.paymentMode='COD';
                  this.removeerror();
                  
            }else {
                  this.paymentMode='Card Payment';
                  this.removeerror();
            }
		
	}
      chanegdateReson(ty:any){
            this.reson=ty;
            if(ty==1){
                  this.reson='Reschedule';
            }else if(ty==2){
                  this.reson='Cancel the unavailable';
            }else if(ty==3){
                  this.reson='Let me know';
            }
	}

      walletfun(ty:any){

            this.walletyesno=ty;
            if(ty==1){
                  if(Number(this.total_cost) < Number(this.walletAmount))
                  {
                        this.usewallet_amount=this.total_cost;
                        this.usewallet_amount=this.total_cost;
                        this.remaining_amount=0;
                  }
                  else{
                       
                        this.usewallet_amount=this.walletAmount;
                        this.remaining_amount=Number(this.total_cost)-Number(this.walletAmount);
                  }
            }else {
                  this.usewallet_amount=this.total_cost;
                  this.remaining_amount=0;
            }
		
	}
      choosedatefun(oftr:any){
            this.senddate=oftr;
      }

      removeerror()
      {
            this.errormsg=0;
            this.errrormessage="";
      }

      nextfun(){
            
            if(this.paymentMode==''){

                  this.rest.translatetsfiledata('Please_choose_Payment_type','warning');
                
            }
            else if(this.senddate==''){
                  this.rest.translatetsfiledata('Please_choose_Delivery_date','warning');
            }
            else if(this.reson==''){
                  this.rest.translatetsfiledata('Choose_option_you_want_when_product_is_not_available','warning');
            }
            else {
                  let adddata={
                        paymentMode:this.paymentMode,
                        senddate:this.senddate,
                        reson:this.reson,
                        addresstitle:this.addresstitle,
                        usewallet_amount:this.usewallet_amount,
                        phone:this.phone,
                        total_cost:this.total_cost,
                        vat_number:this.vat_number,
                        location_id:this.location_id,
                        walletyesno:this.walletyesno,
                       
                  }
            
                  localStorage.setItem("confirmdata",JSON.stringify(adddata));
                  this.router.navigate(["/user/confirm-payment"]);
            
            }
      }
      
      addressFun(ty:any)
	{
            this.popshow=0;
		this.addresstitle=ty;
	}

}
function getDate() {
      throw new Error('Function not implemented.');
}

