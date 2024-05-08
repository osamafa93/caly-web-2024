import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { OfferpricePipe } from 'src/app/Pipes/offerprice.pipe';

import { MapComponent } from './map.component';


import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { HttpClient } from '@angular/common/http';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';
export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, "./assets/language/", ".json");
}

@NgModule({
      declarations: [
        MapComponent,
            OfferpricePipe
      ],
      imports: [
            BrowserModule,
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
      bootstrap: [MapComponent]
})
export class MapModule { }
