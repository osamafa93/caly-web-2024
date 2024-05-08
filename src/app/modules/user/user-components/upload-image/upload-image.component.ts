import { Component,OnInit } from '@angular/core';
import { RestService } from 'src/app/services/rest.service';
import { LoaderService } from 'src/app/loader.service';
import { Router } from '@angular/router';
import {TranslateService} from '@ngx-translate/core';
import { ToastrService } from 'ngx-toastr';
import * as $ from 'jquery';
@Component({
  selector: 'app-upload-image',
  templateUrl: './upload-image.component.html',
  styleUrls: ['./upload-image.component.scss']
})
export class UploadImageComponent implements OnInit{
     
      direction:any='';
      verification_type:any='';
      images:any='';
      SendImage:any='';
      Userdata:any='';
      servicedata:any = [];
      constructor(private translate : TranslateService,private toastr: ToastrService,public router: Router,public rest: RestService,private loaderService: LoaderService)
      {
            this.Userdata=JSON.parse(localStorage.getItem('userData') || '{}');
            this.verification_type=localStorage.getItem('verificationType');  
      }


      verificationfun()
      {
           
            this.servicedata = [];
            this.servicedata.push({"customer_id":this.Userdata.customer_id});
            this.servicedata.push({"verification_type":'store'});
            this.servicedata.push({"verification_picture":this.SendImage});
            this.rest.serverdataposttwo("setVerificationPicture",this.servicedata).subscribe( res => {
                  let data:any=res;
                  if(data.status==true)
                  {

                        this.rest.translatetsfiledata('Verified images sucessfully!','Success');
                        this.toastr.success('', 'Success');
                  }
                  else{
                       
                  }
            },error => {
                  console.log(error);
            });
                  
      }

      onFileChange(event:any) {
            console.log(event);
            if (event.target.files && event.target.files[0]) {
                  this.SendImage=event.target.files[0];
                  var filesAmount = event.target.files.length;
                  for (let i = 0; i < filesAmount; i++) {
                        var reader = new FileReader();
                        reader.onload = (event:any) => {
                              this.images=event.target.result;
                              $('.profile-pic').attr('src', event.target.result);
                        }
                        reader.readAsDataURL(event.target.files[i]);
                  }
            }
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
}
