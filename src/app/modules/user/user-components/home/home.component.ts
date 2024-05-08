import { Component ,OnInit} from '@angular/core';
import { RestService } from 'src/app/services/rest.service';
import { LoaderService } from 'src/app/loader.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { OfferpricePipe } from 'src/app/Pipes/offerprice.pipe';
import { NotificationService } from 'src/app/notification.service';
import { TranslateService } from '@ngx-translate/core';
import * as $ from 'jquery';
// import { SwiperOptions } from 'swiper';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  providers: [OfferpricePipe]
})
export class HomeComponent implements OnInit {

      // config: SwiperOptions = {
      //       pagination: {
      //         el: '.swiper-pagination',
      //         clickable: true
      //       },
      //       navigation: {
      //         nextEl: '.swiper-button-next',
      //         prevEl: '.swiper-button-prev'
      //       },
      //       spaceBetween: 30
      // };

      customer_class:any='';
      CategorySection:any=[];
      searchData:any='';
	sectionlist:any=[];
      brandList:any=[];
      CategoryList:any=[];
      productList:any=[];
      Userdata:any='';
      servicedata:any = [];
      searchProduct:any=[];
      section_name:any='';
      vat:any='';

      BannarList:any=[];
      BannarBottomList:any=[];

      direction:any='';

      isLogin:any= localStorage.getItem("IsLogin");
	constructor(private translate: TranslateService,private notiser:NotificationService,private toastr: ToastrService,public router: Router,public rest: RestService,private loaderService: LoaderService)
	{
           this.GetBrandList();
          this.loadfun();
            this.Userdata=JSON.parse(localStorage.getItem('userData') || '{}');
            this.searchData=JSON.parse(localStorage.getItem('searchData') || '{}');
            if(this.Userdata.customer_class==1){
                  this.GetcategoryBySection();

            }else if(this.Userdata.customer_class==2){
                  this.GetcategoryBySection();
            }else if(this.Userdata.customer_class==3){
                  this.GetcategoryBySection();
            }else{
                  this.GetcategoryBySection();
            }
            this.GetBannardList();

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

      gotologinpage(){
            let data = { }
            localStorage.setItem("RequiredPage",'/user');
            localStorage.setItem("RequiredData",JSON.stringify(data));
            localStorage.setItem("RequiredType",'2');
            localStorage.removeItem("IsLogin");
            this.router.navigate(['/login']);
      }
	loadfun()
      {
            this.loaderService.chnagetolloader('true');
            this.rest.serverdataget("getSection?lang=en").subscribe( res => {
                  let data:any=res;
                  this.loaderService.chnagetolloader('false');
                  if(data.status==true)
                  {
                        this.sectionlist=data.data;
                  }
                  else{
                        this.sectionlist=[];
                        this.loaderService.chnagetolloader('false');
                  }
            },error => {
                  console.log(error);
                  this.loaderService.chnagetolloader('false');
            });
            this.GetBrandList();
      }
      GetBannardList()
      {

            this.loaderService.chnagetolloader('true');
            this.rest.serverdataget("getBanners?").subscribe( res => {
                  let data:any=res;
                  this.loaderService.chnagetolloader('false');
                  if(data.status==true)
                  {
                        this.BannarList=data.top;
                        this.BannarBottomList=data.bottom;

                  }
                  else{
                        this.BannarList=[];
                        this.loaderService.chnagetolloader('false');
                  }
            },error => {
                  console.log(error);
                  this.loaderService.chnagetolloader('false');
            });

      }

      GetBrandList()
      {

            this.loaderService.chnagetolloader('true');
            this.rest.serverdataget("getBrands?lang=en").subscribe( res => {
                  let data:any=res;
                  this.loaderService.chnagetolloader('false');
                  if(data.status==true)
                  {
                        this.brandList = data.data;
                  }
                  else{
                        this.brandList=[];
                  }
            },error => {
                  console.log(error);
                  this.loaderService.chnagetolloader('false');
            });

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


      sectionDetails(section_id:any,section_name:any,type:any){

            if(type=='section'){
                  localStorage.setItem('brand_id','');
                  localStorage.setItem('section_id',section_id);
                  localStorage.setItem('section_name',section_name);
                  this.router.navigate(["/user/lighting-section"]);
            }


      }

      sectioncategory(id:any){
            localStorage.setItem('category_id',id);
            this.router.navigate(["/user/lighting-section"]);
      }
      BrandDetails(id:any,brand_name:any){
            localStorage.setItem('brand_id',id);
            localStorage.setItem('section_name',brand_name);
            this.router.navigate(["/user/lighting-section"]);
      }

      // ProductDetailsPage(id:any,cart_id:any,product_name:any){

      //       localStorage.setItem('product_id',id);
      //       localStorage.setItem('cart_id',cart_id);
      //       this.router.navigate(["/user/product-detail"],{ queryParams: { id: id,product_name:product_name}})
      // }

      ProductDetailsPage(id:any,cart_id:any){

            localStorage.setItem('product_id',id);
            localStorage.setItem('cart_id',cart_id);
            this.router.navigate(["/user/product-detail"])
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
                  localStorage.setItem("RequiredPage",'/user');
                  localStorage.setItem("RequiredData",JSON.stringify(data));
                  localStorage.setItem("RequiredType",'1');
                  localStorage.removeItem("IsLogin");
		      this.router.navigate(['/login']);
            }
      }




}
