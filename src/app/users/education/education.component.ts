import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { first } from 'rxjs/operators';

import { AccountService, AlertService } from '@app/_services';

@Component({
  selector: 'app-education',
  templateUrl: './education.component.html',
  styleUrls: ['./education.component.less']
})
export class EducationComponent implements OnInit {

	loading = true;
 	educations = null;
 	public user;

    constructor(private accountService: AccountService) {
    	this.user = this.accountService.userValue;
    }

    ngOnInit() {
      this.accountService.getAllEducation(this.user.id).subscribe(res => {
      	this.educations = res;
      	this.loading = false;
    	}); 
    }
}
