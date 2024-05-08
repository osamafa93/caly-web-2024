
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms'; 
import { ReactiveFormsModule } from '@angular/forms';
import { PrivacyPolicyComponent } from './privacy-policy.component';


import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { HttpClient } from '@angular/common/http';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';
export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, "./assets/language/", ".json");
}
@NgModule({
      declarations: [
        PrivacyPolicyComponent
      ],
            imports: [
            BrowserModule,
            ReactiveFormsModule,
            FormsModule,
            BrowserAnimationsModule,
            TranslateModule.forChild({
            loader: {
                  provide: TranslateLoader,
                  useFactory: (HttpLoaderFactory),
                  deps: [HttpClient]
            }
            }),
      ],
      providers: [],
      bootstrap: [PrivacyPolicyComponent]
})
export class PrivacyPolicyModule { }
