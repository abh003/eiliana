import { Component } from '@angular/core';

import { User } from '@app/_models';
import { AccountService } from '@app/_services';

@Component({ templateUrl: 'layout.component.html' })
export class LayoutComponent { 
	public user;

    constructor(private accountService: AccountService) {
        this.user = this.accountService.userValue;
        console.log(this.user);
    }

}