import { Component } from '@angular/core';
import {TranslateService} from '@ngx-translate/core';
@Component({
  selector: 'app-terms-condition',
  templateUrl: './terms-condition.component.html',
  styleUrls: ['./terms-condition.component.scss']
})
export class TermsConditionComponent {
      lang:any='';
      constructor(private translate: TranslateService)
      {
    		this.lang=localStorage.getItem("DefaultLang")
          	this.translate.setDefaultLang('en');
      }
}
