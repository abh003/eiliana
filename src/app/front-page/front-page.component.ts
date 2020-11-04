import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-front-page',
  templateUrl: './front-page.component.html',
  styleUrls: ['./front-page.component.less']
})
export class FrontPageComponent implements OnInit {
	public slideConfig;
  
  constructor() {
  	this.slideConfig = {
  		"slidesToShow": 4,
	    "slidesToScroll": 1,
	    "nextArrow": "<span class=\"fa fa-angle-right slick-arrow slick-arrow-soft-white slick-arrow-right slick-arrow-centered-y rounded-circle mr-sm-2 mr-xl-4\"></span>",
	    "prevArrow": "<span class=\"fa fa-angle-left slick-arrow slick-arrow-soft-white slick-arrow-left slick-arrow-centered-y rounded-circle ml-sm-2 ml-xl-4\"></span>",
	    "dots": false,
	    "infinite": true,
	    "responsive": [{
         "breakpoint": 768,
         "settings": {
            "slidesToShow": 1,
            "arrows": false
         }
       }]
	};
  }

  ngOnInit(): void {
  }

  slickInit(e) {
    console.log('slick initialized');
  }

}
