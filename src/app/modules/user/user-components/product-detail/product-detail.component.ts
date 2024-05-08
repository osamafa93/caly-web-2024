import { Component ,OnInit,Inject, HostListener } from '@angular/core';
import { RestService } from 'src/app/services/rest.service';
import { LoaderService } from 'src/app/loader.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { NotificationService } from 'src/app/notification.service';
import { DesimalnumberPipe } from 'src/app/Pipes/Desimalnumber.pipe';
import { Subscription } from 'rxjs';
import { DOCUMENT } from '@angular/common';
import {TranslateService} from '@ngx-translate/core';
import { ActivatedRoute, ParamMap } from '@angular/router'
import * as $ from 'jquery';
@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss'],
  providers: [DesimalnumberPipe]
})
export class ProductDetailComponent implements OnInit{
      windowScrolled: boolean | undefined;

      subscription: Subscription | undefined;
      Userdata:any='';
      product_name:any='';
      product_image:any='';
      product_reference_id:any='';
      additional_description:any='';
      energy_efficiency_rating:any='';
      is_offer:any='';
      inventory_id:any='';
      model_no:any='';
      offer_percent:any='';
      piece_price:any='';
      price:any='';
      pro_dimensions:any='';
      product_id:any='';
      ty_per_cartonany='';
      sub_product_name='';
      supplier_id='';
      warranty_period='';
      watt='';
      weight='';
      wishList_id='';
      vat_percentage:any='';
      qty_per_carton:any='';
      after_discount_offer:any='';

      vat_amount:any='';
      totalPrice:any='';
      totalafterdiscount:any='';
      itemprice:any=0;
      vat:any='';
      servicedata:any = [];
      colorCodeList:any=[];
      OtherProductlist:any=[];
      ProductList:any=[];

      loaddatashow:any=3;
      name:any='';
      choosecolor:any='';
      colorname:any='';
      colorStock:any='';
      cartcount:any=0;
      isShow: boolean | undefined;
      topPosToStartShowing = 100;
      direction:any='';
      id: number | undefined
      activeRoute: any;
      totalPeacePrice:any='';

      CategorySection:any=[];

      isLogin:any= localStorage.getItem("IsLogin");
      constructor(@Inject(DOCUMENT) private document: Document,private route: ActivatedRoute,private translate: TranslateService,private notiser:NotificationService,private toastr: ToastrService,public router: Router,public rest: RestService,private loaderService: LoaderService)
      {
		this.Userdata=JSON.parse(localStorage.getItem('userData') || '{}');
            this.subscription = this.notiser.getNotification().subscribe(noti=> {
                  this.chnagefunction();
            });
            this.loadfun();
            if(this.Userdata.customer_class==1){
              this.GetcategoryBySection();

        }else if(this.Userdata.customer_class==2){
              this.GetcategoryBySection();
        }else if(this.Userdata.customer_class==3){
              this.GetcategoryBySection();
        }else{
              this.GetcategoryBySection();
        }
        // this.GetBannardList();


      }
      GetcategoryBySection()
{

    this.loaderService.chnagetolloader('true');
    this.rest.serverdataget("getCategoryBySection?customer_class="+this.Userdata.customer_class).subscribe( res => {
          let data:any=res;
          this.loaderService.chnagetolloader('false');
          if(data.status==true)
          {
                this.CategorySection=data.data;
                this.vat=data.vat;
          }
          else{
                this.CategorySection=[];
          }
    },error => {
          console.log(error);
          this.loaderService.chnagetolloader('false');
    });

}

sectioncategory(id:any){
  localStorage.setItem('category_id',id);
  this.router.navigate(["/user/lighting-section"]);
}
      chnagefunction()
      {
            this.Userdata=JSON.parse(localStorage.getItem('userData') || '{}');
            this.loadfun();
      }

      loadfun()
      {
            this.scrollToTop();
            this.loaderService.chnagetolloader('true');
            this.rest.serverdataget("ProductDetail?customer_id="+this.Userdata.customer_id+"&customer_class="+this.Userdata.customer_class+"&product_id="+localStorage.getItem('product_id')+"&cart_id="+localStorage.getItem('cart_id')).subscribe( res => {
                  let data:any=res;
                  this.loaderService.chnagetolloader('false');
                  if(data.status==true)
                  {
                        this.loaddatashow=1;
                        this.product_image=data.data.product_image;
				this.product_name=data.data.product_name;
				this.product_reference_id=data.data.product_reference_id;
				this.is_offer=data.data.is_offer;
				this.inventory_id=data.data.inventory_id;
				this.model_no=data.data.model_no;
				this.offer_percent=data.data.offer_percent;
				this.piece_price=data.data.piece_price;
				this.price=data.data.price;
				this.pro_dimensions=data.data.pro_dimensions;
				this.product_id=data.data.product_id;
				this.ty_per_cartonany=data.data.ty_per_cartonany;
				this.sub_product_name=data.data.sub_product_name;
				this.supplier_id=data.data.supplier_id;
				this.vat_percentage=data.data.vat_percentage;
				this.warranty_period=data.data.warranty_period;
				this.watt=data.data.watt;
				this.weight=data.data.weight;
				this.wishList_id=data.data.wishList_id;
				this.qty_per_carton=data.data.qty_per_carton;
				this.after_discount_offer=data.data.after_discount_offer;
				this.additional_description=data.data.additional_description;
				this.energy_efficiency_rating=data.data.energy_efficiency_rating;
                        this.supplier_id=data.data.supplier_id;
                        this.vat=data.vat;
                        this.totalPeacePrice=(Number(data.data.piece_price)* Number(data.vat)/100)+Number(data.data.piece_price);
                        this.totalafterdiscount=(Number(data.data.after_discount_offer)* Number(data.vat)/100)+Number(data.data.after_discount_offer);
                        this.totalPrice=(Number(data.data.price)* Number(data.vat)/100)+Number(data.data.price);
                        if(this.is_offer==1){
                              this.itemprice=this.totalafterdiscount;
                        }
                        else{
                              this.itemprice=this.totalPrice;
                        }
                        this.colorCodeList=data.data.color_code;
                        this.choosecolor=this.colorCodeList[0].code;
                        this.colorStock=this.colorCodeList[0].stock;
                        this.colorname=this.colorCodeList[0].name;
                        this.getcartcountfun(this.choosecolor,this.colorname,this.colorStock);
                        this.OtherProductList();
                  }
                  else{
                        this.loaddatashow=0;
                  }
            },error => {
                  console.log(error);
                  this.loaderService.chnagetolloader('false');
            });
      }
      onWindowScroll() {
            if (window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop > 100) {
                this.windowScrolled = true;
            }
           else if (this.windowScrolled && window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop < 10) {
                this.windowScrolled = false;
            }
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
      OtherProductList() {
        // this.loaderService.chnagetolloader('true');
        this.rest.serverdataget("otherProductsFromSameSupplier?customer_id=" + this.Userdata.customer_id + "&customer_class=" + this.Userdata.customer_class + "&product_id=" + localStorage.getItem('product_id') + "&supplier_id=" + this.supplier_id).subscribe(res => {
            let data: any = res;
            this.loaderService.chnagetolloader('false');
            if (data.status == true) {
                var pdt = data.data;
                this.vat = data.vat;
                var actt: any = [];

                // Limit the response to 10 products
                for (let i = 0; i < Math.min(pdt.length, 8); i++) {
                    let val = pdt[i];
                    var newdata = {
                        addedToCart: val.addedToCart,
                        addedToWishList: val.addedToWishList,
                        brand_id: val.brand_id,
                        cart_id: val.brand_id,
                        category_id: val.category_id,
                        price: val.price,
                        product_id: val.product_id,
                        product_image: val.product_image,
                        product_name: val.product_name,
                        product_reference_id: val.product_reference_id,
                        section_id: val.section_id,
                        sub_product_name: val.sub_product_name,
                        supplier_id: val.supplier_id,
                        TotalPrice: ((Number(val.price) * Number(data.vat)) / 100) + Number(val.price)
                    };
                    actt.push(newdata);
                }

                this.OtherProductlist = actt;
            } else {
                this.OtherProductlist = [];
            }
        }, error => {
            console.log(error);
            this.loaderService.chnagetolloader('false');
        });
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

            // this.activeRoute.queryParams.subscribe((params: { [x: string]: number | undefined; }) => {
            //       this.id = params['id'];
            //       this.product_name=params['product_name'];
            // });
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
                  localStorage.setItem("RequiredPage",'/user/product-detail');
                  localStorage.setItem("RequiredData",JSON.stringify(data));
                  localStorage.setItem("RequiredType",'1');
                  localStorage.removeItem("IsLogin");
		      this.router.navigate(['/login']);
            }
      }

      ProductDetailsPage(product_id:any,cart_id:any){
            localStorage.setItem('product_id',product_id);
            localStorage.setItem('cart_id',cart_id);
            this.notiser.chnagetolloader('true');
            this.scrollToTop();
      }
      getcartcountfun(code:any,name:any,stock:any){
            this.choosecolor=code;
            this.colorname=name;
            this.colorStock=stock;
            this.servicedata=[];
            this.servicedata.push({"customer_id":this.Userdata.customer_id});
            this.servicedata.push({"product_id":localStorage.getItem('product_id')});
            this.servicedata.push({"color_code":code});
            this.rest.serverdataposttwo("checkProductExists",this.servicedata).subscribe( res => {
                  let data:any=res;
                  if(data.status==true)
                  {
                        this.cartcount=Number(data.data.quantity);
                        this.itemprice=Number(this.cartcount)*Number(this.totalPrice);
                  }
                  else{
                        this.cartcount=0;
                        this.itemprice=Number(this.cartcount)*Number(this.totalPrice);
                  }
            },error => {
                  console.log(error);
            });
      }

      addTocardPlus(){

            if(this.is_offer==1){
                  if(this.cartcount < this.colorStock){
                        this.cartcount =this.cartcount+1;
                        this.itemprice=Number(this.cartcount)*Number(this.totalafterdiscount);
                  }
                  else{

                        this.rest.translatetsfiledata('No_more_quantity_available_on_Inventory','warning');
                  }
            }else{
                  if(this.cartcount < this.colorStock){
                        this.cartcount =this.cartcount+1;
                        this.itemprice=Number(this.cartcount)*Number(this.totalPrice)
                  }
                  else{
                        this.rest.translatetsfiledata('No_more_quantity_available_on_Inventory','warning');
                  }
            }


      }

      addTocardminus(){

            if(this.is_offer==1){
                  if(this.cartcount > 1){
                        this.cartcount =this.cartcount-1;
                        this.itemprice=Number(this.cartcount)*Number(this.totalafterdiscount)
                  }
                  else{

                        this.rest.translatetsfiledata('Use_valid_carton_quantity','warning');
                  }
            }
            else
            {
                  if(this.cartcount > 1){
                        this.cartcount =this.cartcount-1;
                        this.itemprice=Number(this.cartcount)*Number(this.totalPrice)
                  }
                  else{
                        this.rest.translatetsfiledata('Use_valid_carton_quantity','warning');

                  }
            }

      }

      addTocard()
      {
            if(this.isLogin=='1'){
                  this.servicedata = [];
                  this.servicedata.push({"customer_id":this.Userdata.customer_id});
                  this.servicedata.push({"product_id":localStorage.getItem('product_id')});
                  this.servicedata.push({"quantity":this.cartcount});
                  this.servicedata.push({"color_code":this.choosecolor});
                  this.servicedata.push({"color_name":this.colorname});
                  this.servicedata.push({"inventory_id":this.inventory_id});
                  this.servicedata.push({"supplier_id":this.supplier_id});
                  this.servicedata.push({"stock":this.colorStock});
                  this.rest.serverdataposttwo("AddToCart",this.servicedata).subscribe( res => {
                        let data:any=res;
                        if(data.status==true)
                        {
                              this.cartcount=data,data;
                              this.cartcount='0';
                              this.rest.translatetsfiledata('Product_added_in_your_cart','Success');

                              this.notiser.chnagetolloader('true');
                        }
                        else{
                              this.cartcount=0;
                        }
                  },error => {
                        console.log(error);
                  });
            }
            else{
                  let data = {
                        "product_id":localStorage.getItem('product_id'),
                        "quantity":this.cartcount,
                        "color_code":this.choosecolor,
                        "color_name":this.colorname,
                        "inventory_id":this.inventory_id,
                        "supplier_id":this.supplier_id,
                        "stock":this.colorStock,
                  }
                  localStorage.setItem("RequiredPage",'/user/product-detail');
                  localStorage.setItem("RequiredData",JSON.stringify(data));
                  localStorage.setItem("RequiredType",'3');
                  localStorage.removeItem("IsLogin");
		      this.router.navigate(['/login']);
            }

      }


}
