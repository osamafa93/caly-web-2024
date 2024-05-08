import { Component } from '@angular/core';
import { RestService } from 'src/app/services/rest.service';
import { LoaderService } from 'src/app/loader.service';
import { Router } from '@angular/router';
import {TranslateService} from '@ngx-translate/core';
import { ToastrService } from 'ngx-toastr';
import * as $ from 'jquery';
@Component({
  selector: 'app-favourites',
  templateUrl: './favourites.component.html',
  styleUrls: ['./favourites.component.scss']
})
export class FavouritesComponent {

      loaddatashow:any=3;
      vat:any='';
      Userdata:any='';
      servicedata:any = [];
      WishListProduct:any=[];
      isLogin:any= localStorage.getItem("IsLogin");
      constructor(private translate: TranslateService,private toastr: ToastrService,public router: Router,public rest: RestService,private loaderService: LoaderService)
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
            this.rest.serverdataget("listOfWishList?customer_id="+this.Userdata.customer_id+"&customer_class="+this.Userdata.customer_class).subscribe( res => {
                  let data:any=res;
                  this.loaddatashow=1;
                  this.loaderService.chnagetolloader('false');
                  if(data.status==true)
                  {
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
                                    TotalPrice:((Number(val.price)* Number(data.vat))/100)+ Number(val.price)
                              } 
                              actt.push(newdata);
                        });
                        this.WishListProduct=actt; 
                  }
                  else{
                        this.loaddatashow=0;
                        this.WishListProduct=[];
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

      scrollToTop() {
            (function smoothscroll() {
                var currentScroll = document.documentElement.scrollTop || document.body.scrollTop;
                if (currentScroll > 0) {
                    window.requestAnimationFrame(smoothscroll);
                    window.scrollTo(0, currentScroll - (currentScroll / 8));
                }
            })();
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
                  localStorage.setItem("RequiredPage",'/user/favourites');
                  localStorage.setItem("RequiredData",JSON.stringify(data));
                  localStorage.setItem("RequiredType",'1');
                  localStorage.removeItem("IsLogin");
		      this.router.navigate(['/login']);
            }
      }
}
