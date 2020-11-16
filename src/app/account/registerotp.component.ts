import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';

import { AccountService, AlertService } from '@app/_services';
import { RegisterComponent } from './register.component';
import { RegisterBasicComponent } from './register-basic.component';
import { LoginComponent } from './login.component';
import Swal from 'sweetalert2/dist/sweetalert2.js';

@Component({
  templateUrl: 'registerotp.component.html',
})
export class RegisterotpComponent implements OnInit {
	form: FormGroup;
    loading = false;
    submitted = false;
    public reg_id;
    public email_otp;
    public mobile_otp;
    public userExists;
  	
  	constructor(
        private formBuilder: FormBuilder,
        private route: ActivatedRoute,
        private router: Router,
        private accountService: AccountService,
        private alertService: AlertService
    ) { 
  		this.reg_id = localStorage.getItem("reg_id");
      this.mobile_otp = localStorage.getItem("mobile_otp");
      this.email_otp = localStorage.getItem("email_otp");
    }

  	
    ngOnInit() {
        this.form = this.formBuilder.group({
        	reg_id: this.reg_id,
          otp: ['', [Validators.required, Validators.minLength(4)]],
          otpm: ['', [Validators.required, Validators.minLength(4)]]
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
        this.accountService.verifyotp(this.form.value).subscribe(response => {
                // console.log(response);
                this.userExists = response;
                if (this.userExists.success == '0') {
                    this.alertService.error(this.userExists.errors);
                    Swal.fire({
                      icon: 'error',
                      title: 'Oops...',
                      text: this.userExists.errors,
                      showConfirmButton: false,
                      timer: 2000
                    })
                    this.loading = false;
                } else {
                    this.alertService.success('OTP Verify Successful', { keepAfterRouteChange: true });
                    Swal.fire({
                      icon: 'success',
                      title: 'Success...',
                      text: 'Otp verify successful',
                    })
                    // localStorage.setItem("reg_id", this.userExists.reg_id);
                    this.router.navigate(['../registerbasic'], { relativeTo: this.route });
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

    resendOtp(){
        console.log('otp send');
    }

    otpController(event,next,prev){
        //console.log(event.key);
       if(event.target.value.length < 1 && prev){
         prev.setFocus();
       }
       else if(next && event.target.value.length>0){
         next.setFocus();
       }
       else {
        return 0;
       } 
    }
}
