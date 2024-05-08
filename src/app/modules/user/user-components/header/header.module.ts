import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HeaderComponent } from './header.component';

import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { HttpClient } from '@angular/common/http';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';
export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, "./assets/language/", ".json");
}
@NgModule({
  declarations: [HeaderComponent],
  imports: [
      CommonModule,
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
            component: HeaderComponent,
            },
      ]),
],
})

export class HeaderModule {}
