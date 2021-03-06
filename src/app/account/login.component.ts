﻿import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';

import { AccountService, AlertService } from '@app/_services';
import Swal from 'sweetalert2/dist/sweetalert2.js';

@Component({ templateUrl: 'login.component.html' })
export class LoginComponent implements OnInit {
    form: FormGroup;
    loading = false;
    submitted = false;
    public userCheck;

    constructor(
        private formBuilder: FormBuilder,
        private route: ActivatedRoute,
        private router: Router,
        private accountService: AccountService,
        private alertService: AlertService
    ) { }

    ngOnInit() {
        this.form = this.formBuilder.group({
            email: ['', Validators.required],
            password: ['', Validators.required]
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
        this.accountService.login(this.f.email.value, this.f.password.value).subscribe(response => {
                // console.log(response);
                this.userCheck = response;
                if (this.userCheck.success == '0') {
                    this.alertService.error(this.userCheck.errors);
                    Swal.fire({
                      icon: 'error',
                      title: 'Oops...',
                      text: this.userCheck.errors,
                      showConfirmButton: false,
                      timer: 2000
                    })
                    this.loading = false;
                } else if (this.userCheck.success == '1') {

                    this.alertService.success(this.userCheck.errors, { keepAfterRouteChange: true });
                    // localStorage.removeItem('reg_id')
                    Swal.fire({
                      icon: 'warning',
                      title: 'Warning...',
                      text: this.userCheck.errors,
                      showConfirmButton: false,
                      timer: 2000
                    })
                    localStorage.setItem("user_id", this.userCheck.id);
                    this.router.navigate(['../loginfirst'], { relativeTo: this.route });
                } else {
                    // get return url from query parameters or default to home page
                    // localStorage.setItem('user', JSON.stringify(this.userCheck.user));
                    const returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/home';
                    this.router.navigateByUrl(returnUrl);
                }
            }, (data) => {
                this.alertService.error('General error has occurred');
                Swal.fire({
                  icon: 'error',
                  title: 'Oops...',
                  text: 'Something went wrong!',
                  showConfirmButton: false,
                  timer: 2000
                })
                this.loading = false;
        });
    }
}