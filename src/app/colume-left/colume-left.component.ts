import { Component, OnInit } from '@angular/core';

import { User } from '@app/_models';
import { AccountService } from '@app/_services';

@Component({
  selector: 'app-colume-left',
  templateUrl: './colume-left.component.html',
  styleUrls: ['./colume-left.component.less']
})
export class ColumeLeftComponent implements OnInit {
	user: User;
  	
  	constructor(private accountService: AccountService) { 
  		this.user = this.accountService.userValue;
  	}

  	ngOnInit(): void {
  	}

}
