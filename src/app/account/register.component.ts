import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';

import { AccountService, AlertService } from '@app/_services';

@Component({ templateUrl: 'register.component.html' })
export class RegisterComponent implements OnInit {
    form: FormGroup;
    loading = false;
    submitted = false;
    step = 1;
    public userExists:any = [];

    constructor(
        private formBuilder: FormBuilder,
        private route: ActivatedRoute,
        private router: Router,
        private accountService: AccountService,
        private alertService: AlertService
    ) { 
        
    }

    ngOnInit() {
        this.form = this.formBuilder.group({
            email: ['', [Validators.required, Validators.email]],
            mobile: ['', [Validators.required, Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$")]],
            acceptTerms: [false, Validators.requiredTrue]
        });
    }

    // convenience getter for easy access to form fields
    get f() { return this.form.controls; }

    onSubmit() {
        this.submitted = true;

        // reset alerts on submit
        this.alertService.clear();

        // stop here if form is invalid
        if (this.form.invalid) {
            return;
        }

        this.loading = true;
        this.accountService.checkUserExists(this.form.value).subscribe(response => {
                // console.log(response);
                this.userExists = response;
                if (this.userExists.usersexist == '1') {
                    this.alertService.error(this.userExists.error);
                    this.loading = false;
                } else if (this.userExists.usersexist == '2') {
                    this.alertService.error(this.userExists.error);
                    this.loading = false;
                } else {
                    this.alertService.success('Otp send to your mobile and email successful', { keepAfterRouteChange: true });
                    // localStorage.removeItem('reg_id')
                    localStorage.setItem("reg_id", this.userExists.reg_id);
                    this.router.navigate(['../registerotp'], { relativeTo: this.route });
                }
            }, (data) => {
                this.alertService.error('General error has occurred');
                this.loading = false;
        });
    }
}