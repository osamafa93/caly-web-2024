import { Component } from '@angular/core';
import { RestService } from 'src/app/services/rest.service';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import {TranslateService} from '@ngx-translate/core';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  
})
export class LoginComponent {
	
      loadershow:any=0;
      country_code:any='+966';
      jsonDataResult:any;
      terms_condion:any=false;
      form!: FormGroup;
      submitted = false;
      country:any=[];
      popshow:any=0;
      servicedata:any = [];
	constructor(private http: HttpClient,private translate: TranslateService,public router: Router,private formBuilder: FormBuilder,public rest: RestService)
	{
            this.http.get('/assets/country/country.json').subscribe((res) => {
                  this.jsonDataResult = res;
            });
            
	}
	ngOnInit (){
            this.form = this.formBuilder.group(
            {
                
                  // country_code: [
                  //       '', 
                  //       [
                  //             Validators.required,
                  //       ]
                  // ],
                  mobile_number: [
                        '',
                        [
                              Validators.required,
                              Validators.minLength(10)
                        ]
                  ]
            });

          
      }
      get f(): { [key: string]: AbstractControl } {
            return this.form.controls;
      }
	GotoLogin(): void {
    
            var terms_condion=0;
            if(this.terms_condion==true){
                  terms_condion=1;
            }
            this.submitted = true;
            if (this.form.invalid) {
                  return;
            }
            else{
                  this.loadershow=1;
                  
                  this.servicedata = [];
			this.servicedata.push({"country_code":this.country_code});
                  this.servicedata.push({"phone": this.form.value.mobile_number});
			this.servicedata.push({"device_type": "web"});
                  this.servicedata.push({"device_token": localStorage.getItem("push_token")});
                  this.servicedata.push({"lang":"en"});
                  this.rest.serverdataposttwo("login",this.servicedata).subscribe( res => {
                        let data:any=res;
                        this.loadershow=0;
                        if(data.status==true)
                        { 
                              localStorage.setItem('userData',JSON.stringify(data.data));
                              localStorage.setItem('phone_number',''+data.data.phone);  
                              localStorage.setItem('otpshow',''+data.data.otp);  
                              this.router.navigate(["/otp"]);
            
                        }
                        else {
                             
                        }
            },error => {
                  
            });
            }
      }

      countryCodeFun(ty:any){
            this.popshow=ty;
            console.log(this.popshow)
      }

      confirm(data:any){
            this.country_code=data.Phone_code;
            console.log(this.country_code);
            this.popshow=0;

      }
}
