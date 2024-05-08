import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms'; 
import { ReactiveFormsModule } from '@angular/forms';
import { ProductDetailComponent } from './product-detail.component';
import { DesimalnumberPipe } from 'src/app/Pipes/Desimalnumber.pipe';

import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { HttpClient } from '@angular/common/http';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';
export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http,"./assets/language/", ".json");
}
@NgModule({
      declarations: [
        ProductDetailComponent
      ],
      imports: [
	BrowserModule,
	BrowserAnimationsModule,
	FormsModule,
	ReactiveFormsModule,
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
      bootstrap: [ProductDetailComponent]
})
export class ProductDetailModule { }
