import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';

import { AccountService, AlertService } from '@app/_services';
import { MustMatch } from '@app/_helpers';

import Swal from 'sweetalert2/dist/sweetalert2.js';

@Component({
  selector: 'app-login-first',
  templateUrl: './login-first.component.html',
  styleUrls: ['./login-first.component.less']
})
export class LoginFirstComponent implements OnInit {
	form: FormGroup;
    loading = false;
    submitted = false;
    public userCheck;
    public user_id;
  	
  	constructor(
  		private formBuilder: FormBuilder,
        private route: ActivatedRoute,
        private router: Router,
        private accountService: AccountService,
        private alertService: AlertService
  	) {
  		this.user_id = localStorage.getItem("user_id");
  	}

  	ngOnInit(): void {
  		this.form = this.formBuilder.group({
  			user_id: this.user_id,
           	password: ['', [Validators.required, Validators.minLength(6)]],
            confirmPassword: ['', Validators.required]
        }, {
            validator: MustMatch('password', 'confirmPassword')
        });
  	}

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
        this.accountService.loginFirst(this.form.value).subscribe(response => {
                console.log(response);
                this.userCheck = response;
                if (this.userCheck.success == '0') {
                    this.alertService.error(this.userCheck.error);
                    Swal.fire({
                      icon: 'error',
                      title: 'Oops...',
                      text: this.userCheck.error,
                      showConfirmButton: false,
                      timer: 2000
                    })
                    this.loading = false;
                } else {
                    // get return url from query parameters or default to home page
                    // localStorage.setItem('user', JSON.stringify(this.userCheck.user));
                    this.alertService.success('Password changed sucessfully!', { keepAfterRouteChange: true });
                    Swal.fire({
                      icon: 'success',
                      title: 'Success...',
                      text: 'Password changed sucessfully',
                    })
                    localStorage.removeItem('reg_id');
                    this.router.navigate(['/profile'], { relativeTo: this.route });
                    // const returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
                    // this.router.navigateByUrl(returnUrl);
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
