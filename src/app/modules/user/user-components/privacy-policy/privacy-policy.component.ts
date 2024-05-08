import { Component,OnInit } from '@angular/core';
import {TranslateService} from '@ngx-translate/core';
@Component({
  selector: 'app-privacy-policy',
  templateUrl: './privacy-policy.component.html',
  styleUrls: ['./privacy-policy.component.scss']
})
export class PrivacyPolicyComponent implements OnInit{
	lang:any='';
      direction:any='';
      constructor(private translate: TranslateService)
      {
		this.lang=localStorage.getItem("DefaultLang")
        	
      }

      ngOnInit(): void {
		this.translate.addLangs(['en', 'ar','zh','ur']);
            if (localStorage.getItem('DefaultLang') == 'en') {
                  this.translate.setDefaultLang('en');
            } 
            else if (localStorage.getItem('DefaultLang') == 'ar') {
                  this.translate.setDefaultLang('ar');
                  document.dir = this.direction;
            } 
            else if (localStorage.getItem('DefaultLang') == 'zh'){
                  
                  this.translate.setDefaultLang('zh');
            }else if(localStorage.getItem('DefaultLang') == 'ur'){

                  this.translate.setDefaultLang('ur');
            }
	}
}
