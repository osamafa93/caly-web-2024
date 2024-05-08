import { Component,OnInit,Inject } from '@angular/core';
import { LoaderService } from './loader.service';
import { NavigationStart, Router } from '@angular/router';
import { environment } from "../environments/environment";
import { getMessaging, getToken, onMessage } from "firebase/messaging";
import { Subscription } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { NotificationService } from './notification.service';
import { TranslateService } from '@ngx-translate/core';
import { LangService } from './lang.service';
import { DOCUMENT } from '@angular/common';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
	lang: any = '';
      direction: string = "rtl";
	message: any = null;
	title = 'caly-user-web';
	showloader: any = false;
	subscription: Subscription;
	constructor(@Inject(DOCUMENT) private document: Document,private translate: TranslateService,private langService: LangService,private toastr: ToastrService,private notiser:NotificationService, private loaderService: LoaderService,public route: Router)
	{
            this.subscription = this.langService.getlang().subscribe(product => {
                  this.languagechnagefunction();
            });

            this.subscription = this.loaderService.getloader().subscribe(product => {
                  this.loagerchnagefunction(product.loc);
            });
		this.requestPermission();
	}

	loagerchnagefunction(ty: any) {

		if (ty == 'true') {
			this.showloader = true;
		}
		else {
			this.showloader = false;
		}
	}

	languagechnagefunction() {


		if (localStorage.getItem("DefaultLang") == 'en') {
                  this.translate.setDefaultLang('en');
                  this.lang = 'en';
                  document.dir = "ltr";
		}
		else if(localStorage.getItem("DefaultLang") == 'ar') {
                  this.translate.setDefaultLang('ar');
                  this.lang = 'ar';
                  document.dir = "rtl";
                  console.log('rtllllllllll',this.lang)
		}
		else if (localStorage.getItem("DefaultLang") == 'zh') {
                  this.translate.setDefaultLang('zh');
                  this.lang = 'zh';
                  document.dir = "ltr";
		}else if (localStorage.getItem("DefaultLang") == 'ur') {
                  this.translate.setDefaultLang('ur');
                  this.lang = 'ur';
                  document.dir = "ltr";

		}
		else {
                  localStorage.setItem("DefaultLang", 'en')
                  this.translate.setDefaultLang('en');
                  document.dir = "ltr";
                  this.lang = 'en';

		}

      }


      ngOnInit() {
            var htmlTag = this.document.getElementsByTagName("html")[0] as HTMLHtmlElement;
            if (localStorage.getItem("DefaultLang") == 'en') {
                  this.translate.setDefaultLang('en');
                  this.lang = 'en';
                  htmlTag.dir = "ltr";
			htmlTag.lang = this.lang;
            }
            else if (localStorage.getItem("DefaultLang") == 'ar') {
                  this.translate.setDefaultLang('ar');
                  this.lang = 'ar';
                  htmlTag.dir = "rtl";
			htmlTag.lang = this.lang;
            }
            else if (localStorage.getItem("DefaultLang") == 'zh') {

                  this.translate.setDefaultLang('zh');
                  this.lang = 'zh';
                  htmlTag.dir = "ltr";
			htmlTag.lang = this.lang;
            }
            else if(localStorage.getItem("DefaultLang") == 'ur'){
                  this.translate.setDefaultLang('ur');
                  this.lang = 'ur';
                  htmlTag.dir = "ltr";
			htmlTag.lang = this.lang;
            }
            else {
                  localStorage.setItem("DefaultLang", 'en')
                  this.translate.setDefaultLang('en');
                  this.lang = 'en';
                  htmlTag.dir = "ltr";
			htmlTag.lang = this.lang;
            }

            this.requestPermission();
            this.listen();

      }

      requestPermission() {
            const messaging = getMessaging();
            getToken(messaging,{ vapidKey: environment.firebase.vapidKey }).then(
            (currentToken) => {
                  if (currentToken) {
                        console.log("Hurraaa!!! we got the token.....");
                        console.log(currentToken);
                        localStorage.setItem("push_token", currentToken);

                  } else {
                        console.log('No registration token available. Request permission to generate one.');
                  }
            }).catch((err) => {
                  console.log('An error occurred while retrieving token. ', err);
            });
      }
      listen() {
            const messaging = getMessaging();
            onMessage(messaging, (payload:any) => {
                  this.notiser.chnagetolloader('true');
                  this.toastr.success(payload.notification.title,payload.notification.body);
                  this.message = payload;
            });
      }
}
