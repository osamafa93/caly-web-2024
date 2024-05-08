import { Component , OnInit, ViewChild,} from '@angular/core';
import { RestService } from 'src/app/services/rest.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { NotificationService } from 'src/app/notification.service';
import { Subscription } from 'rxjs';
import {TranslateService} from '@ngx-translate/core';
@Component({
  selector: 'app-otp',
  templateUrl: './otp.component.html',
  styleUrls: ['./otp.component.scss']
})
export class OtpComponent implements OnInit{

	otp:any='';
	showotp:any='';
	showOtpComponent = true;
      subscription: Subscription | undefined;
	@ViewChild("ngOtpInput", { static: false }) ngOtpInput: any;
	config = {
		allowNumbersOnly: true,
		length:5,
		isPasswordInput: false,
		disableAutoFocus: false,
		placeholder: "-",
	};

      errormsg:any=0;
  	errrormessage:any='';
      otpverify:any=1;
	servicedata:any = [];
	firscall:any=0;
      direction:any='';
      loadershow:any=0;
      attacteddata:any=[];
      Userdata:any=[];
	constructor(private translate : TranslateService,private notiser:NotificationService,private toastr: ToastrService,public router: Router,public rest: RestService)
	{
            this.showotp = localStorage.getItem("otpshow");
            this.subscription = this.notiser.getNotification().subscribe(noti=> {
                  this.chnagefunction();
            });
	}
      
      chnagefunction()
      {
            this.showotp = localStorage.getItem("otpshow");
      }
	ngOnInit(): void {
            
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

   
	onOtpChange(event:any)
	{
		
		if(event.length == 5)
		{
			this.otpverify=4;
			this.otp=event;
		}
	}
            
      verifyotpfun()
      {
            this.loadershow=1;
            this.servicedata = [];
            this.servicedata.push({"otp":this.otp});
            this.servicedata.push({"phone":localStorage.getItem('phone_number')});
            this.servicedata.push({"city":'riyadh'});
            this.rest.serverdataposttwo("matchedOtp",this.servicedata).subscribe( res => {
                
                  let data:any=res;
                  if(data.status==true)
                  {
                        localStorage.setItem("IsLogin",'1');
                        //this.router.navigate(["/user"]); 
                        this.toastr.success('Login Sucessfully', 'Success');
                        this.calltheactionfun();
                  }
                  else{
                        this.loadershow=0;
                        this.errormsg=1;
                        this.errrormessage=data.message;
                  }
            },error => {
                  this.loadershow=0;
                  console.log(error);
            });
                  
      }

      
      calltheactionfun(){
            this.Userdata=JSON.parse(localStorage.getItem('userData') || '{}');
            this.attacteddata=JSON.parse(localStorage.getItem('RequiredData') || '{}');
            var requiredType= localStorage.getItem("RequiredType");
            var requiredUrl= localStorage.getItem("RequiredPage");
            if(requiredType=='1')
            {
                  this.addtowishlist(this.Userdata.customer_id,this.attacteddata.wishlistId,requiredUrl);
            }
            else if(requiredType=='2')
            {
                  this.router.navigate([requiredUrl]);
            }
            else if(requiredType=='3')
            {
                  this.addTocard(this.Userdata,this.attacteddata,requiredUrl);
            }
      }
      addtowishlist(userId:any,proId:any,url:any){
            this.servicedata = [];
            this.servicedata.push({"customer_id":userId});
            this.servicedata.push({"product_id":proId});
            this.rest.serverdataposttwo("addwishList",this.servicedata).subscribe( res => {
                  let data:any=res;
                  this.loadershow=0;
                  if(data.status==true)
                  {
                        if(data.data.addedToWishList=='1'){
                              this.rest.translatetsfiledata('Added_to_Favorite_list','Success');
                        }else {
                              this.rest.translatetsfiledata('Removed_from_Favorite_list','Success');
                        }
                        this.router.navigate([url]);
                  }
                  else{
                        this.loadershow=0;
                  }
            },error => {
                  console.log(error);
                  this.loadershow=0;
            });
      }
      addTocard(Userdata:any,attacteddata:any,requiredUrl:any)
      {
           
            this.servicedata = [];
            this.servicedata.push({"customer_id":Userdata.customer_id});
            this.servicedata.push({"product_id":attacteddata.product_id});
            this.servicedata.push({"quantity":attacteddata.quantity});
            this.servicedata.push({"color_code":attacteddata.color_code});
            this.servicedata.push({"color_name":attacteddata.color_name});
            this.servicedata.push({"inventory_id":attacteddata.inventory_id});
            this.servicedata.push({"supplier_id":attacteddata.supplier_id});
            this.servicedata.push({"stock":attacteddata.stock});
            this.rest.serverdataposttwo("AddToCart",this.servicedata).subscribe( res => {
                  let data:any=res;
                  this.loadershow=0;
                  if(data.status==true)
                  {
                        this.router.navigate([requiredUrl]);
                        this.rest.translatetsfiledata('Product_added_in_your_cart','Success');
                  }
                  
            },error => {
                  this.loadershow=0;
                  console.log(error);
            });   
      }

      gotoResendOtp(){

            this.servicedata = [];
            this.servicedata.push({"phone":localStorage.getItem('phone_number')});
            this.servicedata.push({"lang":'en'});
            this.rest.serverdataposttwo("resendOtp",this.servicedata).subscribe( res => {
            let data:any=res;
            if(data.status==true)
            {  
                  localStorage.setItem('otpshow',''+data.data.otp);  
                  this.notiser.chnagetolloader('true'); 
                  this.rest.translatetsfiledata('OTP_has_been_sent_again','Success');
            }
            else {
                        
                  this.errormsg=1;
                  this.errrormessage=data.message;
            }
            },error => {
                  
            });
      
      }
}
