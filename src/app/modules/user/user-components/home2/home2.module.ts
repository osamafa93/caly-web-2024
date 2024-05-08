import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { OfferpricePipe } from 'src/app/Pipes/offerprice.pipe';
import { Home2Component } from './home2.component';
// import { NgxUsefulSwiperModule } from 'ngx-useful-swiper';

import { TranslateLoader,TranslateModule } from '@ngx-translate/core';
import { HttpClient } from '@angular/common/http';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';
export function HttpLoaderFactory(http: HttpClient) {

	return new TranslateHttpLoader(http, "./assets/language/", ".json");
}

@NgModule({
      declarations: [
            Home2Component,
            OfferpricePipe,

      ],
      imports: [
            BrowserModule,
            BrowserAnimationsModule,
            // NgxUsefulSwiperModule,

            TranslateModule.forChild({
                  loader: {
                        provide: TranslateLoader,
                        useFactory: (HttpLoaderFactory),
                        deps: [HttpClient]
                  }
            }),
      ],
      schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
      providers: [],
      bootstrap: [Home2Component]
})
export class HomeModule { }
