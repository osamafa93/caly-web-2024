import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './user-components/home/home.component';
import { UserRoutingModule } from './user-routing.module';
import { MainComponent } from './user-components/main/main.component';
import { FooterComponent } from './user-components/footer/footer.component';
import { HeaderComponent } from './user-components/header/header.component';
import { MapComponent } from './user-components/map/map.component';
import { FavouritesComponent } from './user-components/favourites/favourites.component';
import { OffersComponent } from './user-components/offers/offers.component';
import { BestSellersComponent } from './user-components/best-sellers/best-sellers.component';
import { LightingSectionComponent } from './user-components/lighting-section/lighting-section.component';
import { ProductDetailComponent } from './user-components/product-detail/product-detail.component';
import { CartComponent } from './user-components/cart/cart.component';
import { PaymentComponent } from './user-components/payment/payment.component';
import { ConfirmPaymentComponent } from './user-components/confirm-payment/confirm-payment.component';
import { SavedLocationComponent } from './user-components/saved-location/saved-location.component';
import { ProfileComponent } from './user-components/profile/profile.component';
import { VerifyAccountComponent } from './user-components/verify-account/verify-account.component';
import { UploadImageComponent } from './user-components/upload-image/upload-image.component';
import { OrderDetailComponent } from './user-components/order-detail/order-detail.component';
import { OrderListComponent } from './user-components/order-list/order-list.component';
import { ToastrModule } from 'ngx-toastr';
import { FormsModule } from '@angular/forms';
import { DesimalnumberPipe } from 'src/app/Pipes/Desimalnumber.pipe';
// import { NgxUsefulSwiperModule } from 'ngx-useful-swiper';
import { PrivacyPolicyComponent } from './user-components/privacy-policy/privacy-policy.component';
import { TermsConditionComponent } from './user-components/terms-condition/terms-condition.component';

import { HttpClientModule,HttpClient } from '@angular/common/http';
import {TranslateModule, TranslateLoader} from '@ngx-translate/core';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';
import { PaymentSuccessfullyComponent } from './user-components/payment-successfully/payment-successfully.component';
import { Home2Component } from './user-components/home2/home2.component';

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, "./assets/language/", ".json");
}


@NgModule({
    declarations: [
	HomeComponent,
	MainComponent,
	FooterComponent,
	HeaderComponent,
	MapComponent,
	FavouritesComponent,
	OffersComponent,
	BestSellersComponent,
	LightingSectionComponent,
	ProductDetailComponent,
	CartComponent,
	PaymentComponent,
	ConfirmPaymentComponent,
	SavedLocationComponent,
	ProfileComponent,
	VerifyAccountComponent,
	UploadImageComponent,
	OrderDetailComponent,
	OrderListComponent,
	DesimalnumberPipe,
	PrivacyPolicyComponent,
	TermsConditionComponent,
 PaymentSuccessfullyComponent,
 Home2Component

    ],
    imports: [
		CommonModule,
		UserRoutingModule,
		// NgxUsefulSwiperModule,
		FormsModule,
		HttpClientModule,
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

})

export class UserModule { }
