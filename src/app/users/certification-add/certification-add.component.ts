import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';

import { AccountService, AlertService } from '@app/_services';

@Component({
  selector: 'app-certification-add',
  templateUrl: './certification-add.component.html',
  styleUrls: ['./certification-add.component.less']
})
export class CertificationAddComponent implements OnInit {

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
            certificationId: ['', Validators.requiredTrue],
            certificationName: ['', Validators.requiredTrue],
            validTill: ['', [Validators.required, Validators.pattern(/^\d{4}\-(0[1-9]|1[012])\-(0[1-9]|[12][0-9]|3[01])$/)]]
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
