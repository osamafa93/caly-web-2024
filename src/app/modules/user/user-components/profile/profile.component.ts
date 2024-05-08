import { Component,OnInit,Inject } from '@angular/core';
import { LoaderService } from 'src/app/loader.service';
import { RestService } from 'src/app/services/rest.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { HttpClient } from '@angular/common/http';
import { LangService } from 'src/app/lang.service';
import {TranslateService} from '@ngx-translate/core';
import { DOCUMENT } from '@angular/common';
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit{
	string:any='';
	lang:any='';

      popshow:any='0';
	Userdata:any='';
	
	activity_type:any='';
	address:any='';
	bought_monthly:any='';
	city:any='';
	company_name:any='';
	country_code:any='';
	credit_limit:any='';
	customer_class:any='';
	customer_id:any='';
	email:any='';
	is_cart:any='';
	is_riyadh:any='';
	job_name:any='';
	lat:any='';
	lng:any='';
	name:any='';
	note:any='';
	phone:any='';
	place_type:any='';
	shop_photo:any='';
	under_review:any='';
	vat_number:any='';
	verification_picture:any='';
	verification_type:any='';

      bougthmonthly:any='';
      jobname:any='';
      servicedata:any = [];
      loaddatashow:any=3;
      direction:any='';
      isLogin:any= localStorage.getItem("IsLogin");
      constructor(@Inject(DOCUMENT) private document: Document,private translate : TranslateService,private langService: LangService,private http: HttpClient, private toastr: ToastrService,public router: Router,public rest: RestService,private loaderService: LoaderService)
      {
           
            this.langService.chnagetolang(this.lang);
		this.Userdata=JSON.parse(localStorage.getItem('userData') || '{}');
		this.loadfun();
          
      }
	popopenfun(type:any){
		this.popshow=type;
            if(type==3){
                  this.privaceyPoliceyfun()
            }else if(type==4){
                  this.termsAndConfun();
            }
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
            } 
            else if (localStorage.getItem('DefaultLang') == 'zh'){
                  
                  this.translate.setDefaultLang('zh');
            }else if(localStorage.getItem('DefaultLang') == 'ur'){

                  this.translate.setDefaultLang('ur');
            }
	}

	loadfun()
      {
           
            this.loaderService.chnagetolloader('true');
            this.rest.serverdataget("getCustomerData?customer_id="+this.Userdata.customer_id).subscribe( res => {
                  let data:any=res;
			this.loaddatashow=1;
                  this.loaderService.chnagetolloader('false');
                  if(data.status==true)
                  {
                        this.activity_type=data.data.activity_type;
                        this.address=data.data.address;
                        this.bought_monthly=data.data.bought_monthly;
                        this.city=data.data.city;
                        this.company_name=data.data.company_name;
                        this.country_code=data.data.country_code;
                        this.credit_limit=data.data.credit_limit;
                        this.customer_class=data.data.customer_class;
                        this.customer_id=data.data.customer_id;
                        this.email=data.data.email
                        this.is_cart=data.data.email;
                        this.is_riyadh=data.data.is_riyadh
                        this.job_name=data.data.job_name;
                        this.lat=data.data.lat
                        this.lng=data.data.lat;
                        this.name=data.data.name;
                        this.phone=data.data.phone;
                        this.note=data.data.note;
                        this.place_type=data.data.place_type;
                        this.shop_photo=data.data.shop_photo;
                        this.under_review=data.data.under_review;
                        this.vat_number=data.data.vat_number;
                        this.verification_picture=data.data.verification_picture;
                        this.verification_type=data.data.verification_type;
                        localStorage.setItem('verificationType',''+this.verification_type); 
                        localStorage.setItem('walletAmount',''+ this.credit_limit);  
                        localStorage.setItem('userProfileData',data.data);
                        
                  }
                  else{
                        this.loaddatashow=0;
                        this.loaderService.chnagetolloader('false');
                  }    
            },error => {
                  console.log(error);
                  this.loaderService.chnagetolloader('false');
            });
            
      }

      BougthMonthlyfun(ty:any)
	{
            if(ty==1)
            {
                  this.bought_monthly='More than 1,00,000';
            }else if(ty==2){
                  this.bought_monthly='50,000 - 1,00,000';
            }
            else {
                  this.bought_monthly='Less than 50,000';
            }
	}

      place_typeFun(ty:any)
	{
		this.place_type=ty;
           
	}

      activity_typefun(ty:any){
		this.activity_type=ty;
	}

      jobTypefun(ty:any){
            if(ty==1)
            {
                  if(this.popshow=0){
                        this.job_name='Branch manager';
                  }
                  
            }else if(ty==2){
                  this.job_name='Purchases manager';
            }
            else {
                  this.job_name='Owner';
            }
	}

      
      CustomerDataUpdate()
      {

            this.servicedata = [];
            this.servicedata.push({"customer_id":this.Userdata.customer_id});
            this.servicedata.push({"name":this.name});
            this.servicedata.push({"email":this.email});
            this.servicedata.push({"company_name":this.company_name});
            this.servicedata.push({"bought_monthly":this.bought_monthly});
            this.servicedata.push({"place_type":this.place_type});
            this.servicedata.push({"activity_type":this.activity_type});
            this.servicedata.push({"job_name":this.job_name});
            this.rest.serverdataposttwo("updateCustomerData",this.servicedata).subscribe( res => {
                  let data:any=res;
                  if(data.status==true)
                  {
                        this.toastr.success(data.message,'Success');
                  }
                  else{
                       
                  }
            },error => {
                  console.log(error);
            });
                  
      }

      termsAndConfun()
      {
            this.http.get("https://caly.sa/caly-backend/term-and-condition?lang=en").subscribe( (res: any) => {
                  let data:any=res;
                  this.loaderService.chnagetolloader('false');
                  if(data.status==true)
                  {
                      
                  }  
            },(error: any) => {
                  console.log(error);
                  this.loaderService.chnagetolloader('false');
            });   
      }

      privaceyPoliceyfun()
      {
            this.http.get("https://caly.sa/caly-backend/privacy-policy?lang=en").subscribe( (res: any) => {
                  let data:any=res;
                  this.loaderService.chnagetolloader('false');
                  if(data.status==true)
                  {
                      
                  }  
            },(error: any) => {
                  console.log(error);
                  this.loaderService.chnagetolloader('false');
            });   
      }

      gotochangelang()
	{
		if(this.lang == '')
		{

		}
		else{
			localStorage.setItem("DefaultLang",this.lang)
			if(this.lang == 'en')
			{
				this.translate.setDefaultLang('en');
				this.switchLang('');
                        this.popshow=0;
			}
			else if(this.lang=='ar')
			{
				this.translate.setDefaultLang('ar'); 
				this.switchLang('');
                        this.popshow=0;
			}
			else if(this.lang=='zh'){
                       
				this.translate.setDefaultLang('zh'); 
				this.switchLang('');
                        this.popshow=0;
			}
                  else if(this.lang=='ur'){
                       
				this.translate.setDefaultLang('ur'); 
				this.switchLang('');
                        this.popshow=0;
			}
			this.langService.chnagetolang(this.lang);
		}
	}

      switchLang(lang: string) {
		const htmlTag = this.document.getElementsByTagName("html")[0] as HTMLHtmlElement;
		if(lang=='ar')
		{
			htmlTag.dir = "rtl";
			htmlTag.lang = lang;
		}
		else{
			htmlTag.dir = "ltr";
			htmlTag.lang = lang;
		}
		this.translate.use(lang);
	}

      chooselangfun(ty:any){

            if(ty==1){
                  this.lang='en';
            }
            else if(ty==2){
                  this.lang='ar';
                  
            }
            else if(ty==3){
                  this.lang='zh';

            }else{
                  this.lang='ur';
                  
            }
            
      }

      
}
