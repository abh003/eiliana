import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';

import { AccountService, AlertService } from '@app/_services';
import Swal from 'sweetalert2/dist/sweetalert2.js';

@Component({ templateUrl: 'basic-info.component.html' })
export class BasicInfoComponent implements OnInit {
    users = null;
    public user;

    form: FormGroup;
    loading = false;
    submitted = false;
    step = 1;
    public userDatas:any = [];
    public registration_id;
    public username;
    public password;

    countries = null;
    govtIDs = [
      { id: '1', name: 'Driving Licence' },
      { id: '2', name: 'Aadhar Card' },
      { id: '3', name: 'Voter Id Card' },
    ];

    constructor(private formBuilder: FormBuilder,
        private route: ActivatedRoute,
        private router: Router,
        private accountService: AccountService,
        private alertService: AlertService) {
        this.user = this.accountService.userValue;
    }

    ngOnInit() {
        this.accountService.getAllCountry().subscribe(res => {
            this.countries = res;
        });
        
        this.form = this.formBuilder.group({
            user_id: [this.user.id],
            username:  [this.user.username, Validators.compose([
                    Validators.required
            ])],
            title: [this.user.title, Validators.compose([
                    Validators.required
            ])],
            first_name: [this.user.first_name, Validators.compose([
                    Validators.required
            ])],
            last_name: [this.user.last_name, Validators.compose([
                    Validators.required
            ])],
            dob: [this.user.dob, Validators.compose([
                    Validators.required, Validators.pattern(/^\d{4}\-(0[1-9]|1[012])\-(0[1-9]|[12][0-9]|3[01])$/)
            ])],
            pseudoName: [this.user.pseudoName, Validators.compose([
                    Validators.required
            ])],
            govtID: [this.user.govtID, Validators.compose([
                    Validators.required
            ])],
            country: [this.user.country, Validators.compose([
                    Validators.required
            ])],
            idProofNo: [this.user.idProofNo, Validators.compose([
                    Validators.required
            ])]
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

        let data = JSON.parse(JSON.stringify(this.form.value));
         
        this.loading = true;
        this.accountService.updateProfile(data).subscribe(response => {
                this.userDatas = response;
                if (this.userDatas.success == '0') {
                    this.alertService.error(this.userDatas.errors);
                    Swal.fire({
                      icon: 'error',
                      title: 'Oops...',
                      text: this.userDatas.errors,
                      showConfirmButton: false,
                      timer: 2000
                    });
                    this.loading = false;
                } else {
                    this.alertService.success('Profile sucessfully created', { keepAfterRouteChange: true });
                    Swal.fire({
                      icon: 'success',
                      title: 'Success...',
                      text: 'Profile sucessfully updated',
                    })
                    this.router.navigate(['./education'], { relativeTo: this.route });
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

    onReset() {
        this.submitted = false;
        this.form.reset();
    }
}