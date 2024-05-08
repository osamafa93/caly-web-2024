import { Component,OnInit,Inject} from '@angular/core';
import { RestService } from 'src/app/services/rest.service';
import { LoaderService } from 'src/app/loader.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { DOCUMENT } from '@angular/common';
import { NotificationService } from 'src/app/notification.service';
import {TranslateService} from '@ngx-translate/core';
import * as $ from 'jquery';

@Component({
  selector: 'app-lighting-section',
  templateUrl: './lighting-section.component.html',
  styleUrls: ['./lighting-section.component.scss']
})
export class LightingSectionComponent implements OnInit{
      direction:any='';
      windowScrolled: boolean | undefined;
     
      subscription: Subscription | undefined;
      popshow:any='0';
      section_name:any='';
      loaddatashow:any=3;
      sortBy:any='';
      vat:any='';
      Userdata:any='';
      productsCount:any='';
      ProductList:any=[];
      CategoryList:any=[];
      servicedata:any = [];
      categy_id:any='';
      isShow: boolean | undefined;
      topPosToStartShowing = 100;
      isLogin:any= localStorage.getItem("IsLogin");
      constructor(@Inject(DOCUMENT) private document: Document,private translate: TranslateService,private notiser:NotificationService,private toastr: ToastrService,public router: Router,public rest: RestService,private loaderService: LoaderService)
      {
            this.Userdata=JSON.parse(localStorage.getItem('userData') || '{}');
            this.section_name=localStorage.getItem('section_name');
            if(localStorage.getItem('category_id')){
                  this.GetcategoryList();
            }else {
                  localStorage.setItem('category_id','');
                  this.GetcategoryList();
            }
            this.scrollToTop();
            
      }
      popopenfun(type:any){
            this.popshow=type;
      }

      ngOnInit(): void {
		
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

      GetcategoryList()
      {
            this.loaderService.chnagetolloader('true');
            this.rest.serverdataget("getCategories?section_id="+localStorage.getItem('section_id')).subscribe( res => {
                  let data:any=res;
                  this.loaderService.chnagetolloader('false');
                  if(data.status==true)
                  {
                        this.loaddatashow=1;
                        this.CategoryList=data.data;
                  }
                  else{
                        this.loaddatashow=0;
                        this.CategoryList=[];
                        
                  }    
            },error => {
                  console.log(error);
                  this.loaderService.chnagetolloader('false');
            });
            this.GetProductList();
      }

      GetProductList()
      {
            this.rest.serverdataget("getProducts?section_id="+localStorage.getItem('section_id')+"&brand_id="+localStorage.getItem('brand_id')+"&customer_id="+this.Userdata.customer_id+"&category_id="+localStorage.getItem('category_id')+"&customer_class="+this.Userdata.customer_class).subscribe( res => {
                  let data:any=res;
                  if(data.status==true)
                  {
                        this.loaddatashow=2;
                        this.productsCount=data.productsCount;
                        var pdt = data.data;
                        this.vat=data.vat;
                        var actt:any = [];
                        $.each(pdt, function (key, val) {

                              var newdata = {
                                    addedToCart:val.addedToCart,
                                    addedToWishList:val.addedToWishList,
                                    brand_id:val.brand_id,
                                    cart_id:val.brand_id,
                                    category_id:val.category_id,
                                    is_featured:val.is_featured,
                                    is_offer:val.is_offer,
                                    offer_price:val.offer_price,
                                    price:val.price,
                                    product_id:val.product_id,
                                    product_image:val.product_image,
                                    product_name:val.product_name,
                                    product_reference_id:val.product_reference_id,
                                    quantity:val.quantity,
                                    section_id:val.section_id,
                                    sub_product_name:val.sub_product_name,
                                    supplier_id:val.supplier_id,
                                    totalofferprice:((Number(val.offer_price)* Number(data.vat))/100)+ Number(val.offer_price),
                                    TotalPrice:((Number(val.price)* Number(data.vat))/100)+ Number(val.price)
                              } 
                              actt.push(newdata);
                              
                        });
                        this.ProductList=actt;
                        localStorage.removeItem('category_id');
                  }
                  else{
                        // this.loaddatashow=2;
                        localStorage.removeItem('category_id');
                        this.ProductList=[];
                  }    
            },error => {
                  console.log(error);
                  this.loaderService.chnagetolloader('false');
            });
           
      }
      ProductDetailsPage(product_id:any,cart_id:any){
            localStorage.setItem('product_id',product_id);
            localStorage.setItem('cart_id',cart_id);
            this.router.navigate(["/user/product-detail"]);
      }

      sectionDetails(id:any){

            localStorage.setItem('category_id',id);
            this.GetcategoryList();
            this.scrollToTop();
      }
      
      addToWishList(id:any)
      {
            if(this.isLogin=='1'){
                  this.servicedata = [];
                  this.servicedata.push({"customer_id":this.Userdata.customer_id});
                  this.servicedata.push({"product_id":id});
                  this.rest.serverdataposttwo("addwishList",this.servicedata).subscribe( res => {
                        let data:any=res;
                        if(data.status==true)
                        {
                              if(data.data.addedToWishList=='1'){
                                    this.rest.translatetsfiledata('Added_to_Favorite_list','Success');
                              }else {
                                    this.rest.translatetsfiledata('Removed_from_Favorite_list','Success');
                              }
                        }
                        else{
                              this.loaderService.chnagetolloader('false');
                        }
                  },error => {
                        console.log(error);
                        this.loaderService.chnagetolloader('false');
                  });
            }
            else{
                  let data = {
                        wishlistId:id
                  }
                  localStorage.setItem("RequiredPage",'/user/lighting-section');
                  localStorage.setItem("RequiredData",JSON.stringify(data));
                  localStorage.setItem("RequiredType",'1');
                  localStorage.removeItem("IsLogin");
		      this.router.navigate(['/login']);
            }
      }
      
      shortfun(ty:any){
            this.popshow=0;
            this.sortBy=ty;
            if(ty==1){
                  this.sortBy='1';
                  this.shortByFun();
            }else if(ty==2){
                  this.sortBy='2';
                  this.shortByFun();
            }
            else if(ty==3){
                  this.sortBy='3';
                  this.shortByFun();
            }else{
                  this.sortBy='4';
                  this.shortByFun();
            }
      }


      shortByFun()
      {

            this.loaderService.chnagetolloader('true');
            this.rest.serverdataget("getProducts?section_id="+localStorage.getItem('section_id')+"&customer_id="+this.Userdata.customer_id+"&customer_class="+this.Userdata.customer_class+"&brand_id="+localStorage.getItem('brand_id')+"&sortBy="+this.sortBy).subscribe( res => {
                  let data:any=res;
                  this.loaderService.chnagetolloader('false');
                  if(data.status==true)
                  {
                        this.productsCount=data.productsCount;
                        var pdt = data.data;
                        this.vat=data.vat;

                        var actt:any = [];
                        $.each(pdt, function (key, val) {

                              var newdata = {
                                    addedToCart:val.addedToCart,
                                    addedToWishList:val.addedToWishList,
                                    brand_id:val.brand_id,
                                    cart_id:val.brand_id,
                                    category_id:val.category_id,
                                    is_featured:val.is_featured,
                                    is_offer:val.is_offer,
                                    offer_price:val.offer_price,
                                    price:val.price,
                                    product_id:val.product_id,
                                    product_image:val.product_image,
                                    product_name:val.product_name,
                                    product_reference_id:val.product_reference_id,
                                    quantity:val.quantity,
                                    section_id:val.section_id,
                                    sub_product_name:val.sub_product_name,
                                    supplier_id:val.supplier_id,
                                    TotalPrice:((Number(val.offer_price)* Number(data.vat))/100)+ Number(val.offer_price)

                              } 
                              actt.push(newdata);
                        });
                        this.ProductList=actt;
                  }
                  else{
                        this.ProductList=[];
                  }    
            },error => {
                  console.log(error);
                  this.loaderService.chnagetolloader('false');
            });
           
      }
      
      scrollToTop() {
            (function smoothscroll() {
                var currentScroll = document.documentElement.scrollTop || document.body.scrollTop;
                if (currentScroll > 0) {
                    window.requestAnimationFrame(smoothscroll);
                    window.scrollTo(0, currentScroll - (currentScroll / 8));
                }
            })();
      }
      goToBottom(){
            window.scrollTo(0,document.body.scrollHeight);
      }
      
}
