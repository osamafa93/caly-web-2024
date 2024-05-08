import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { OtpComponent } from './components/otp/otp.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { FormsModule } from '@angular/forms';
import { NgOtpInputModule } from  'ng-otp-input';
import { ReactiveFormsModule } from '@angular/forms';
import { ToastrModule } from 'ngx-toastr';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
// import { NgxUsefulSwiperModule } from 'ngx-useful-swiper';
import { environment } from "../environments/environment";
import { initializeApp } from "firebase/app";

import { HttpClientModule,HttpClient } from '@angular/common/http';
import {TranslateModule, TranslateLoader} from '@ngx-translate/core';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';
initializeApp(environment.firebase);

export function HttpLoaderFactory(http: HttpClient) {
     return new TranslateHttpLoader(http, "./assets/language/", ".json");
}
@NgModule({
     declarations: [
          AppComponent,
          LoginComponent,
          OtpComponent,
          NotFoundComponent
     ],
     imports: [
          BrowserModule,
          HttpClientModule,
          AppRoutingModule,
          FormsModule,
          ReactiveFormsModule,
          NgOtpInputModule,
          // NgxUsefulSwiperModule,
          BrowserAnimationsModule,
          TranslateModule,
          ToastrModule.forRoot({
               timeOut: 2000,
               positionClass: 'toast-bottom-right',
               preventDuplicates: true,
         }),

          TranslateModule.forRoot({
            loader: {
                  provide: TranslateLoader,
                  useFactory: (HttpLoaderFactory),
                  deps: [HttpClient]
               }
          })
     ],

     providers: [],
     bootstrap: [AppComponent]
})

export class AppModule { }

