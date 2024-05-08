import { Component, AfterViewInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

declare var $: any;

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements AfterViewInit {

  constructor(private translate: TranslateService) { }

  ngAfterViewInit(): void {
    console.log("Hello Jquery",$); // This should log the jQuery function if jQuery is properly integrated
    this.setupBackToTopButton();
  }

  private setupBackToTopButton(): void {
    $(window).scroll(() => {
      console.log("Scrolling..."); // This should log when you scroll
      if ($(window).scrollTop() > 100) {
        $('.back-to-top').fadeIn('slow');
      } else {
        $('.back-to-top').fadeOut('slow');
      }
    });

    $('.back-to-top').click(function () {
      console.log("Back to top clicked!"); // This should log when the button is clicked
      $('html, body').animate({ scrollTop: 0 }, 1500, 'swing');
      return false;
    });
  }
}
