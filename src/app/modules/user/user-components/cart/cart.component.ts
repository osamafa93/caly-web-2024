import { Component,OnInit } from '@angular/core';
import { RestService } from 'src/app/services/rest.service';
import { LoaderService } from 'src/app/loader.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { DesimalnumberPipe } from 'src/app/Pipes/Desimalnumber.pipe';
import { NotificationService } from 'src/app/notification.service';
import {TranslateService} from '@ngx-translate/core';
import { Subscription } from 'rxjs';
import * as $ from 'jquery';
@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
  providers: [DesimalnumberPipe]
})
export class CartComponent implements OnInit{
      myCartCount:any='';
      offer_price:any='';
      discount_coupon:any='';
      delivery_charges:any='';
      vat_price:any='';
      vat_percentage:any='';
      sub_total:any='';
      total:any='';
      subscription: Subscription | undefined;
      loaddatashow:any=3;
      totalPrice:any='';

      vat:any='';
      cartcount:any=0;
      itemprice:any=0;
      promocode:any='';
      servicedata:any = [];
      cartlist:any=[];
      Userdata:any='';
      key:any='';
      direction:any='';
      isLogin:any= localStorage.getItem("IsLogin");
      constructor(private translate: TranslateService,private notiser:NotificationService,private toastr: ToastrService,public router: Router,public rest: RestService,private loaderService: LoaderService)
      {
            
            if(this.isLogin!='1'){
                  this.router.navigate(['/user']);
            }
		this.Userdata=JSON.parse(localStorage.getItem('userData') || '{}');
            this.loadfun();
      }
    
      loadfun()
      {
            this.loaderService.chnagetolloader('true');
            this.rest.serverdataget("myCart?customer_id="+this.Userdata.customer_id).subscribe( res => {
                  let data:any=res;
                  this.loaderService.chnagetolloader('false');
                  if(data.status==true)
                  {
                        this.loaddatashow=0;
                        this.myCartCount=data.myCartCount;
                        this.offer_price=data.offer_price;
                        this.discount_coupon=data.discount_coupon;
                        this.delivery_charges=data.delivery_charges;
                        this.vat_price=data.vat_price;
                        this.vat_percentage=data.vat_percentage;
                        this.sub_total=data.sub_total;
                        this.total=data.total;
                       
                        this.vat=data.vat;
                        var card = data.data;
                        var actt:any = [];
                        $.each(card, function (key, val) {
                              var newdata = {
                                    cart_id:val.cart_id,
                                    color_code:val.color_code,
                                    color_name:val.color_name,
                                    customer_id:val.customer_id,
                                    discounted_price:val.discounted_price,
                                    offer_percent:val.offer_percent,
                                    offer_price:val.offer_price,
                                    product_id:val.product_id,
                                    product_image:val.product_image,
                                    product_name:val.product_name,
                                    product_price:val.product_price,
                                    product_reference_id:val.product_reference_id,
                                    qty_per_carton:val.qty_per_carton,
                                    quantity:val.quantity,
                                    stock:val.stock,
                                    supplier_id:val.supplier_id,
                                    total_product_price:val.total_product_price,
                                    vat_percentage:val.vat_percentage,
                                    TotalPrice:((Number(val.product_price)* Number(val.vat_percentage))/100)+ Number(val.product_price),

                                    TotalDiscountPrice:((Number(val.discounted_price)* Number(val.vat_percentage))/100)+ Number(val.discounted_price)
                              } 
                              actt.push(newdata);
                        
                        });
                        this.cartlist=actt;
                       
                  }
                  else{
                        this.loaddatashow=1;
                        this.cartlist=[];
                  }    
            },error => {
                  console.log(error);
                  this.loaderService.chnagetolloader('false');
            });
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

      applycouponfun()
      {
            if(this.promocode==''){
                  this.rest.translatetsfiledata('Enter_a_valid_Promocode','warning');
            }else {
                  
                  this.servicedata = [];
                  this.servicedata.push({"customer_id":this.Userdata.customer_id});
                  this.servicedata.push({"promo":this.promocode});
                  this.rest.serverdataposttwo("addPromocode",this.servicedata).subscribe( res => {
                        let data:any=res;
                        this.Mycalculationfun();
                        if(data.status==true)
                        {
                              this.rest.translatetsfiledata('Promocode_has_been_applied','Success');
                        }
                        else{
                              this.rest.translatetsfiledata('Enter_a_valid_Promocode','warning');
                        }
                  },error => {
                        console.log(error);
                  }); 
            }    
      }

      cartPlusminus(ty:any,pl:any,cart_id:any){
          if(ty==1){
                  if(Number(pl.quantity) >= Number(pl.stock)){
                        pl.quantity=Number(pl.quantity)
                        this.rest.translatetsfiledata('No_more_quantity_available_on_Inventory','warning');
                  }
                  else{
                        pl.quantity=Number(pl.quantity)+1
                        this.cartcount= pl.quantity;
                        this.plusminusfun(cart_id);
                  }
            }
            else{
			if(Number(pl.quantity) != 1)
			{
				pl.quantity=Number(pl.quantity)-1;
                        this.cartcount= pl.quantity;
                        this.plusminusfun(cart_id)
			}
                  else{

                        this.rest.translatetsfiledata('Use_valid_carton_quantity','warning');
                  }
		}
      }

      plusminusfun(cart_id:any){
      
            this.servicedata = [];
            this.servicedata.push({"customer_id":this.Userdata.customer_id});
            this.servicedata.push({"cart_id":cart_id});
            this.servicedata.push({"quantity":this.cartcount});
            this.rest.serverdataposttwo("CartIncDec",this.servicedata).subscribe( res => {
                  let data:any=res;
                  this.Mycalculationfun();
                  if(data.status==true)
                  {
                        
                  }
                  else{
                        
                  }
            },error => {
                  console.log(error);
            });     
      }

      Mycalculationfun()
      {
            this.rest.serverdataget("myCartCalculation?customer_id="+this.Userdata.customer_id).subscribe( res => {
                  let data:any=res;
                  this.loaderService.chnagetolloader('false');
                  if(data.status==true)
                  {
                        this.myCartCount=data.myCartCount;
                        this.offer_price=data.offer_price;
                        this.discount_coupon=data.discount_coupon;
                        this.delivery_charges=data.delivery_charges;
                        this.vat_price=data.vat_price;
                        this.vat_percentage=data.vat_percentage;
                        this.sub_total=data.sub_total;
                        this.total=data.total;
                        this.vat=data.vat;
                        // this.toastr.success('Quantitiy update sucessfully!', 'Success');
                  }
 
            },error => {
                  console.log(error);
                  this.loaderService.chnagetolloader('false');
            });
      }

      profilecheck()
      {
           
            this.loaderService.chnagetolloader('true');
            this.rest.serverdataget("checkCustomerThatHeUpdateTheImformation?customer_id="+this.Userdata.customer_id).subscribe( res => {
                  let data:any=res;
                  this.loaderService.chnagetolloader('false');
                  if(data.status==true)
                  {
                        if(data.key==1){
                              this.router.navigate(["/user/payment"]);
                        }else {
                              this.router.navigate(["/user/profile"]);
                        }  
                  }
                  else{
                        
                  }    
            },error => {
                  console.log(error);
                  this.loaderService.chnagetolloader('false');
            });
            
      }

      DeleteItemfun(cart_id:any)
      {
            this.servicedata = [];
            this.servicedata.push({"customer_id":this.Userdata.customer_id});
            this.servicedata.push({"cart_id":cart_id});
            this.servicedata.push({"quantity":'0'});
            this.rest.serverdataposttwo("CartIncDec",this.servicedata).subscribe( res => {
                  let data:any=res;
                  this.rest.translatetsfiledata('Removed_from_your_cart','Success');
                  this.loadfun();
                  this.notiser.chnagetolloader('true');
                  if(data.status==true)
                  {
                        
                  }
                  else{
                        
                  }
            },error => {
                  console.log(error);
            });     
      }
}
