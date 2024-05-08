import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { DesimalnumberPipe } from 'src/app/Pipes/Desimalnumber.pipe';
import { CartComponent } from './cart.component';


import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { HttpClient } from '@angular/common/http';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';
export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, "./assets/language/", ".json");
} 

@NgModule({
      declarations: [
            CartComponent
      ],
      imports: [
            BrowserModule,
            BrowserAnimationsModule,
            DesimalnumberPipe,

            TranslateModule.forChild({
                  loader: {
                        provide: TranslateLoader,
                        useFactory: (HttpLoaderFactory),
                        deps: [HttpClient]
                  }
            }),
      ],
      providers: [],
      bootstrap: [CartComponent]
})
export class CartModule { }
