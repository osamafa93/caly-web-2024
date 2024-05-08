import { Component,OnInit,Inject } from '@angular/core';
import { LoaderService } from 'src/app/loader.service';
import { RestService } from 'src/app/services/rest.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { LangService } from 'src/app/lang.service';
import {TranslateService} from '@ngx-translate/core';
import { DOCUMENT } from '@angular/common';
@Component({
  selector: 'app-saved-location',
  templateUrl: './saved-location.component.html',
  styleUrls: ['./saved-location.component.scss']
})
export class SavedLocationComponent implements OnInit{
      
      lang:any='';
      popshow:any='0';
      direction:any='';
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
      loaddatashow:any=3;
      locationType:any='';
	verification_picture:any='';
	verification_type:any='';
      servicedata:any=[];
      locationlist:any=[];
      isLogin:any= localStorage.getItem("IsLogin");
      constructor(@Inject(DOCUMENT) private document: Document,private langService: LangService,private translate : TranslateService,private toastr: ToastrService,public router: Router,public rest: RestService,private loaderService: LoaderService)
      {
		this.Userdata=JSON.parse(localStorage.getItem('userData') || '{}');
            this.lang=localStorage.getItem("DefaultLang");
            this.langService.chnagetolang(this.lang);
		this.loadfun();
            
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
                        
                  }
                  else{
                        this.loaddatashow=0;
                  }    
            },error => {
                  console.log(error);
                  this.loaderService.chnagetolloader('false');
            });
            this.getAllLocation();
      }

      getAllLocation()
      {
           
            this.loaderService.chnagetolloader('true');
            this.rest.serverdataget("getAllLocations?customer_id="+this.Userdata.customer_id).subscribe( res => {
                  let data:any=res;
                  this.loaderService.chnagetolloader('false');
                  if(data.status==true)
                  {
                        this.locationlist=data.data;
                  }
                  else{
                        this.locationlist=[];
                  }    
            },error => {
                  console.log(error);
                  this.loaderService.chnagetolloader('false');
            });
            
      }


      deletelocationfun(id:any)
      {
           
            this.servicedata = [];
            this.servicedata.push({"customer_id":this.Userdata.customer_id});
            this.servicedata.push({"id":id});
            this.servicedata.push({"is_active":'0'});
            this.rest.serverdataposttwo("changeLocation",this.servicedata).subscribe( res => {
                  let data:any=res;
                  if(data.status==true)
                  {
                        this.rest.translatetsfiledata('Location_has_been_deleted','Success');
                  }
                  else{
                       
                  }
            },error => {
                  console.log(error);
            });
                  
      }

      updateLocation(data:any,type:any)
      {     
            this.locationType=type;
            localStorage.setItem('locationData',JSON.stringify(data));
            localStorage.setItem('locationType',this.locationType);
            this.router.navigate(["/user/map"]);  
      }

      Defaultchangefun(id:any)
      {
           
            this.servicedata = [];
            this.servicedata.push({"customer_id":this.Userdata.customer_id});
            this.servicedata.push({"id":id});
            this.servicedata.push({"is_default":'1'});
            this.rest.serverdataposttwo("changeLocation",this.servicedata).subscribe( res => {
                  let data:any=res;
                  this.getAllLocation();
                  if(data.status==true)
                  {
                        this.popshow=0;
                        this.rest.translatetsfiledata('Default_location_has_been_updated','Success');
                  }
                  else{
                  
                  }
            },error => {
                  console.log(error);
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
                  else{
                       
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
                  console.log(this.lang)
            }
            
      }

}
