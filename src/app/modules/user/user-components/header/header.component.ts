import { Component,OnInit} from '@angular/core';
import { RestService } from 'src/app/services/rest.service';
import { LoaderService } from 'src/app/loader.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { NotificationService } from 'src/app/notification.service';
import { Subscription } from 'rxjs';
import {TranslateService} from '@ngx-translate/core';
declare var google: any;
import * as $ from 'jquery';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss'],
    
})
export class HeaderComponent implements OnInit{

    // @HostListener('window:resize', ['$event'])
      subscription: Subscription | undefined;
	popshow: any = '0';
	searchpop: any = '0';
	scrHeight: any;
	scrWidth: any;
      is_default:any=0;
      notidropdown: any = '1';
	searchlistpop:any='';
	Userdata:any='';
	search:any='';
      direction:any='';
      total:any='';
      myCartCount:any='';
      locationType:any='';

      is_riyadh:any='';
      city:any='';

      locationdata:any=[];
      lang: any = '';
      data: any = '';
      map: any;
      latlng: any;
      latitude: any;
      longitude: any;
      mapcity: any;
      maplocation: any;
      google:any='';
      geolocation:any='';
      enterloc: any = '';
      goomap: any;
      maphow: any;;

	servicedata:any=[];
	locationlist:any=[];
	searchProduct:any=[];
      isLogin:any= localStorage.getItem("IsLogin");
	constructor(private translate: TranslateService,private notiser:NotificationService,private toastr: ToastrService,public router: Router,public rest: RestService,private loaderService: LoaderService)
      {
            this.translate.setDefaultLang('en');
            this.Userdata=JSON.parse(localStorage.getItem('userData') || '{}');
            this.myCartCountfun();
            this.getcustomerDataFun();
            this.getLocation();
            this.subscription = this.notiser.getNotification().subscribe(noti=> {
                  this.chnagefunction();
                  this.getLocation();
            });

      }
     
      chnagefunction()
      {
            this.Userdata=JSON.parse(localStorage.getItem('userData') || '{}');
            this.myCartCountfun();
      }
	ngOnInit() {
		this.scrWidth = window.innerWidth;
		this.scrHeight = window.innerHeight;
		if (this.scrWidth > 767) {
			this.searchpop = '1';
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
	getScreenSize(event: any) {
		this.scrHeight = window.innerHeight;
		this.scrWidth = window.innerWidth;
	}
	popopenfun(type: any) {
		this.popshow = type;
		this.getAllLocation();
	}
	
      opennavbar()
	{
		$("#navbaricon").toggleClass("opennavbar");
	}


      closfun(){
            this.searchlistpop=0;
      }
	gotologout()
	{
		localStorage.removeItem("IsLogin");
		this.router.navigate(['/login']);
	}
      gotologinpage(){
            let data = { }
            localStorage.setItem("RequiredPage",'/user');
            localStorage.setItem("RequiredData",JSON.stringify(data));
            localStorage.setItem("RequiredType",'2');
            localStorage.removeItem("IsLogin");
            this.router.navigate(['/login']);
      }

	searchAllProduct(evt:any)
      {
		
            this.rest.serverdataget("searchOnProducts?customer_id="+this.Userdata.customer_id+"&customer_class="+this.Userdata.customer_class+"&search="+this.search).subscribe( res => {
                  let data:any=res;
                  this.searchlistpop=1;
                  this.loaderService.chnagetolloader('false');
                  if(data.status==true)
                  {
                        this.searchProduct=data.data;
                  }
                  else{
                        this.searchProduct=[];
                  }    
            },error => {
                  console.log(error);
                  this.loaderService.chnagetolloader('false');
            });   
      }

      
	getAllLocation()
      {
            this.rest.serverdataget("getAllLocations?customer_id="+this.Userdata.customer_id).subscribe( res => {
                  let data:any=res;
                  this.getcustomerDataFun();
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
      getcustomerDataFun()
      {
           
            this.loaderService.chnagetolloader('true');
            this.rest.serverdataget("getCustomerData?customer_id="+this.Userdata.customer_id).subscribe( res => {
                  let data:any=res;
                 
                  this.loaderService.chnagetolloader('false');
                  if(data.status==true)
                  {
                        if(data.data.city !='')
                        {
                              if(data.data.city !=null)
                              {
                                    this.city=data.data.city;
                              }
                        }
                        this.is_riyadh=data.data.is_riyadh
                  }
                  else{
                        this.loaderService.chnagetolloader('false');
                  }    
            },error => {
                  console.log(error);
                  this.loaderService.chnagetolloader('false');
            });
      }
	// updateLocation(data:any,type:any)
      // {

      //       this.locationType=type;
      //       localStorage.setItem('locationData',JSON.stringify(data));
      //       localStorage.setItem('locationType',this.locationType);
      //       this.router.navigate(["/user/map"]);  
      // }

      updateLocation(data:any,type:any)
      {
            if(this.isLogin=='1'){
                  this.locationType=type;
                  localStorage.setItem('locationData',JSON.stringify(data));
                  localStorage.setItem('locationType',this.locationType);
                  this.router.navigate(["/user/map"]);
            }else{
                  localStorage.setItem("RequiredPage",'/user');
                  localStorage.setItem("RequiredData",JSON.stringify(data));
                  localStorage.setItem("RequiredType",'1');
                  localStorage.removeItem("IsLogin");
		      this.router.navigate(['/login']);
            }
            
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
                        this.chnagefunction();

                        this.rest.translatetsfiledata('Location_has_been_deleted','Success');
                        
                  }
                  else{
                       
                  }
            },error => {
                  console.log(error);
            });
      }
      ProductDetailsPage(product_id:any){
            this.searchlistpop=0;
            
            localStorage.setItem('product_id',product_id);
            this.notiser.chnagetolloader('true');
            this.router.navigate(["/user/product-detail"]);
            // this.notiser.chnagetolloader('true');
      }
      myCartCountfun()
      {
            this.loaderService.chnagetolloader('true');
            this.rest.serverdataget("getCustomerData?customer_id="+this.Userdata.customer_id).subscribe( res => {
                  let data:any=res;
                  this.loaderService.chnagetolloader('false');
                  if(data.status==true)
                  {
                        this.myCartCount=data.carts;
                  }
                  else{
                       
                  }    
            },error => {
                  console.log(error);
                  this.loaderService.chnagetolloader('false');
            });
      }


      checkboxfun(ty:any){
            
            if(ty==1){
                  this.is_default='1';
            }else {
                  this.is_default='0';
            }
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
                        this.rest.translatetsfiledata('Default_change_location_sucessfully','Success');
                       
                  }
                  else{
                  
                  }
            },error => {
                  console.log(error);
            });
      }

     
      
      getLocation() {

            if (navigator.geolocation) {
                  navigator.geolocation.getCurrentPosition((position: any) => {
                        if (position) {
                              this.loadmap(position.coords.latitude, position.coords.longitude);
                              localStorage.setItem("choose_lat", '' + position.coords.latitude);
                              localStorage.setItem("choose_lng", '' + position.coords.longitude);
                        }
                  },
                        (error) => console.log(error));
            } else {
                  this.loadmap('24.7136', "46.6753");
                  localStorage.setItem("choose_lat", '24.7136');
                  localStorage.setItem("choose_lng", '46.6753');

            }
            this.gotookaybtnfun();
      }

      loadmap(lata: any, langa: any) {

            this.latitude = Number(lata);
            this.longitude = Number(langa);

            console.log('lat',this.latitude);
            console.log('lang',this.longitude);
            var myStyles = [
                  {
                        featureType: "poi",
                        elementType: "labels",
                        stylers: [
                              { visibility: "off" }
                        ]
                  }
            ];
            var latlng = new google.maps.LatLng(Number(this.latitude), Number(this.longitude));
            let mapOptions = {
                  center: latlng,
                  zoom: 15,
                  mapTypeId: google.maps.MapTypeId.ROADMAP,
                  styles: myStyles
                 
            }
           
            this.map = new google.maps.Map(document.getElementById("headerlo"), mapOptions);
            var marker = new google.maps.Marker({
                  position: latlng,
                  map: this.map,
                  draggable: true
            });
            let geocoder = new google.maps.Geocoder;
          
            geocoder.geocode({ 'location': { 'lat': this.latitude, 'lng': this.longitude } }, (result: any, status: any) => {
                  this.enterloc = result[0].formatted_address;
                  $("#headerlo").val(this.enterloc);
                
                  this.getcityfun(result[0]);
                  this.enterloc = result[0].formatted_address;
                 
            },(err:any)=>{
                  
            })
            var input = document.getElementById('headerlo');
            var autocomplete = new google.maps.places.Autocomplete(input);

           
            this.gotookaybtnfun();
           
      }

      
      getmapfuns() {
           
            let adddata = {
                  lat: this.latitude,
                  lng: this.longitude,
            }
            this.maphow.addvalueinlocation(JSON.stringify(adddata));
            
      }

      gotookaybtnfun() {

            this.popshow='2';
            var actt:any = [];
            let adddata = {
                  lat: this.latitude,
                  lng: this.longitude,
                  address: this.enterloc,
                  city: this.mapcity,
                  location: this.maplocation,
                
            }
            actt.push('ggg',adddata);
            this.locationdata=actt[0];

            
      }
      getcityfun(alladdress: any) {
            var value = alladdress.address_components;
            var count = value.length;
            var checknu = value[count - 1].long_name;
            if (isNaN(checknu)) {
                  this.city = value[count - 4].long_name;
            }
            else {
                  this.city = value[count - 5].long_name;
            }
           
      }
}
