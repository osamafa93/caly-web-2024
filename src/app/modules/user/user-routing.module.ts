import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FooterComponent } from './user-components/footer/footer.component';
import { HeaderComponent } from './user-components/header/header.component';
import { HomeComponent } from './user-components/home/home.component';
import { MainComponent } from './user-components/main/main.component';
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
import { OrderListComponent } from './user-components/order-list/order-list.component';
import { OrderDetailComponent } from './user-components/order-detail/order-detail.component';
import { PrivacyPolicyComponent } from './user-components/privacy-policy/privacy-policy.component';
import { TermsConditionComponent } from './user-components/terms-condition/terms-condition.component';
import { PaymentSuccessfullyComponent } from './user-components/payment-successfully/payment-successfully.component';
import { Home2Component } from './user-components/home2/home2.component';

const routes: Routes = [
    {
      path: '',
      component: MainComponent,
      children: [
        { path: 'home', component: HomeComponent },
        { path: 'home2', component: Home2Component },
        { path: 'footer', component: FooterComponent },
        { path: 'header', component: HeaderComponent },
        { path: 'map', component: MapComponent },
        { path: 'favourites', component: FavouritesComponent },
        { path: 'offers', component: OffersComponent },
        { path: 'best-sellers', component: BestSellersComponent },
        { path: 'lighting-section', component: LightingSectionComponent },
        { path: 'product-detail', component:  ProductDetailComponent },
        { path: 'cart', component:  CartComponent },
        { path: 'payment', component:   PaymentComponent },
        { path: 'confirm-payment', component:  ConfirmPaymentComponent },
        { path: 'saved-location', component: SavedLocationComponent  },
        { path: 'profile', component: ProfileComponent },
        { path: 'verify-account', component:  VerifyAccountComponent },
        { path: 'upload-image', component:   UploadImageComponent },
        { path: 'order-list', component:   OrderListComponent },
        { path: 'order-detail', component:  OrderDetailComponent },
        { path: 'privacy-policy', component:PrivacyPolicyComponent },
        { path: 'terms-condition', component:TermsConditionComponent },
        { path: 'payment-successfully', component:PaymentSuccessfullyComponent },
        { path: '', redirectTo: '/user/home', pathMatch: 'full' },

      ],
    },
  ];

  @NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
  })
  export class UserRoutingModule { }
