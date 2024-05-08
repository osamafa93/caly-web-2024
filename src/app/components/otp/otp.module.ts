import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { OtpComponent } from './otp.component';
import { FormsModule } from '@angular/forms'; 
import { ReactiveFormsModule } from '@angular/forms';
import { NgOtpInputModule } from 'ng-otp-input';
import { ToastrModule, ToastContainerModule } from 'ngx-toastr';
import { HttpClient } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';
export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, "./assets/language/",".json");
}
@NgModule({
  declarations: [OtpComponent],
  imports: [
    CommonModule,
    FormsModule,
    HttpClient,
    ToastrModule.forRoot({ positionClass: 'inline' }),
    ToastContainerModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    NgOtpInputModule,
    ToastrModule.forRoot({
      timeOut: 2000,
      positionClass: 'toast-bottom-right',
      preventDuplicates: true,
    }), 
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
        component: OtpComponent,
      },
    ]),
  ],
})
export class OtpComponentModule {}
