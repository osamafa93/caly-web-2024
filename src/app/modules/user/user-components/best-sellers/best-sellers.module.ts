import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { BestSellersComponent } from './best-sellers.component';
import { FormsModule } from '@angular/forms'; 
import { ReactiveFormsModule } from '@angular/forms';
import { ToastrModule, ToastContainerModule } from 'ngx-toastr';
import { HttpClient} from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TranslateLoader,TranslateModule } from '@ngx-translate/core';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';
export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, "./assets/language/",".json");
}
@NgModule({
  declarations: [BestSellersComponent],
  imports: [
	CommonModule,
	FormsModule,
	HttpClient,
	ToastrModule.forRoot({ positionClass: 'inline' }),
	ToastContainerModule,
	ReactiveFormsModule,
	BrowserAnimationsModule,
	TranslateModule.forChild({
		loader: {
			provide: TranslateLoader,
			useFactory: (HttpLoaderFactory),
			deps: [HttpClient]
		}
	}),

	RouterModule.forChild([
		{
			path: '',
			component: BestSellersComponent,
		},
	]),
	],
})
export class BestSellersModule {}
