import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';

import { AccountService, AlertService } from '@app/_services';

@Component({
  selector: 'app-addtional-info',
  templateUrl: './addtional-info.component.html',
  styleUrls: ['./addtional-info.component.less']
})
export class AddtionalInfoComponent implements OnInit {
	public user;
	addInfoForm: FormGroup;
    submitted = false;
    loading = false;

	constructor(private formBuilder: FormBuilder,
        private route: ActivatedRoute,
        private router: Router,
        private accountService: AccountService,
        private alertService: AlertService) 
	{ 
		this.user = this.accountService.userValue;
	}

	ngOnInit(): void {
		this.addInfoForm = this.formBuilder.group({
            username: ['', Validators.required],
            typeofpro: ['', Validators.required],
            standard: ['', Validators.required],
            currency: ['', Validators.required],
            availabilityHours: ['', Validators.requiredTrue],
            availabilityDuration: ['', Validators.requiredTrue],
            languageName: ['', Validators.requiredTrue],
            languageHours: ['', Validators.requiredTrue],
            isactive: ['', Validators.requiredTrue]
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
