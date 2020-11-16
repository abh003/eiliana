import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';

import { AccountService, AlertService } from '@app/_services';

@Component({
  selector: 'app-prof-exp',
  templateUrl: './prof-exp.component.html',
  styleUrls: ['./prof-exp.component.less']
})
export class ProfExpComponent implements OnInit {
	
	public user;
	addInfoForm: FormGroup;
    submitted = false;
    loading = false;

    countries = null;

	constructor(private formBuilder: FormBuilder,
        private route: ActivatedRoute,
        private router: Router,
        private accountService: AccountService,
        private alertService: AlertService) 
	{ 
		this.user = this.accountService.userValue;
	}

	ngOnInit(): void {
		this.accountService.getAllCountry().subscribe(res => {
            this.countries = res;
        });
        
		this.addInfoForm = this.formBuilder.group({
            introvideourl: ['', Validators.required],
            skillid: ['', Validators.required],
            skillname: ['', Validators.required],
            skillisactive: ['', Validators.required],
            typeofaccount: ['', Validators.requiredTrue],
            accountName: ['', Validators.requiredTrue],
            accountUsername: ['', Validators.requiredTrue],
            accountPassword: ['', Validators.requiredTrue],
            accountisactive: ['', Validators.requiredTrue],
            companyName: ['', Validators.requiredTrue],
            locationCity: ['', Validators.requiredTrue],
            locationcountry: ['', Validators.requiredTrue],
            proftitle: ['', Validators.requiredTrue],
            fromMonth: ['', Validators.requiredTrue],
            fromYear: ['', Validators.requiredTrue],
            toMonth: ['', Validators.requiredTrue],
            toYear: ['', Validators.requiredTrue],
            isPresent: ['', Validators.requiredTrue],
            roleDescription: ['', Validators.requiredTrue],
            otherExperienceTitle: ['', Validators.requiredTrue],
            otherExperienceDescription: ['', Validators.requiredTrue]
        });
	}

	get f() { return this.addInfoForm.controls; }

    onSubmit() {
        this.submitted = true;

        // stop here if form is invalid
        if (this.addInfoForm.invalid) {
            return;
        }

        // display form values on success
        alert('SUCCESS!! :-)\n\n' + JSON.stringify(this.addInfoForm.value, null, 4));
    }

    onReset() {
        this.submitted = false;
        this.addInfoForm.reset();
    }

}
