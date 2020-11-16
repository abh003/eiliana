import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';

import { AccountService, AlertService } from '@app/_services';
import Swal from 'sweetalert2/dist/sweetalert2.js';

@Component({
  selector: 'app-education-add',
  templateUrl: './education-add.component.html',
  styleUrls: ['./education-add.component.less']
})
export class EducationAddComponent implements OnInit {

	public user;
	addInfoForm: FormGroup;
    id: string;
    isAddMode: boolean;
    submitted = false;
    loading = false;

    educationType = null;
    education = null;
    educationTypeShow = false;

	constructor(private formBuilder: FormBuilder,
        private route: ActivatedRoute,
        private router: Router,
        private accountService: AccountService,
        private alertService: AlertService) 
	{ 
		this.user = this.accountService.userValue;
	}

	ngOnInit(): void {
        this.id = this.route.snapshot.params['id'];
        this.isAddMode = !this.id;
        
        this.accountService.fetchEducationType().subscribe(res => {
            this.educationType = res;
        });
		this.addInfoForm = this.formBuilder.group({
            user_id: this.user.id,
            education_type: ['', Validators.required],
            name: ['', Validators.required],
            from_date: ['', [Validators.required, Validators.pattern(/^\d{4}\-(0[1-9]|1[012])\-(0[1-9]|[12][0-9]|3[01])$/)]],
            to_date: ['', [Validators.required, Validators.pattern(/^\d{4}\-(0[1-9]|1[012])\-(0[1-9]|[12][0-9]|3[01])$/)]],
            degree: [null],
            area_of_education: ['', [Validators.required]],
            description: ['', Validators.required]
        });

        if (!this.isAddMode) {
            this.accountService.getEducationById(this.id)
                .pipe(first())
                .subscribe(x => this.addInfoForm.patchValue(x));
            this.accountService.getEducationById(this.id).subscribe(x => {
              this.education = x;
              this.addInfoForm.patchValue(x);
              let value = this.education.education_type;
                if (value == 1 || value == 2) {
                    this.educationTypeShow = false;
                } else {
                    this.educationTypeShow = true;
                }
            }); 
            
        }
	}

	get f() { return this.addInfoForm.controls; }

    onSubmit() {
        this.submitted = true;

        // reset alerts on submit
        this.alertService.clear();

        // stop here if form is invalid
        if (this.addInfoForm.invalid) {
            return;
        }

        this.loading = true;
        if (this.isAddMode) {
            this.createEducation();
        } else {
            this.updateEducation();
        }
    }

    private createEducation() {
        this.accountService.registerEducation(this.addInfoForm.value)
            .pipe(first())
            .subscribe({
                next: () => {
                    this.alertService.success('Education added successfully', { keepAfterRouteChange: true });
                    Swal.fire({
                      icon: 'success',
                      title: 'Success...',
                      text: 'Education added successfully',
                    })
                    this.router.navigate(['../'], { relativeTo: this.route });
                },
                error: error => {
                    this.alertService.error(error);
                    Swal.fire({
                      icon: 'error',
                      title: 'Oops...',
                      text: error,
                      showConfirmButton: false,
                      timer: 2000
                    });
                    this.loading = false;
                }
            });
    }

    private updateEducation() {
        let data = JSON.parse(JSON.stringify(this.addInfoForm.value));
        data['id'] = this.id;
        this.accountService.updateEducation(data)
            .pipe(first())
            .subscribe({
                next: () => {
                    this.alertService.success('Education Update successful', { keepAfterRouteChange: true });
                    Swal.fire({
                      icon: 'success',
                      title: 'Success...',
                      text: 'Education Update successful',
                    })
                    this.router.navigate(['../../'], { relativeTo: this.route });
                },
                error: error => {
                    this.alertService.error(error);
                    Swal.fire({
                      icon: 'error',
                      title: 'Oops...',
                      text: error,
                      showConfirmButton: false,
                      timer: 2000
                    });
                    this.loading = false;
                }
            });
    }

    onReset() {
        this.submitted = false;
        this.addInfoForm.reset();
    }

    changeEducationType(e){
        let value = e.target.value;
        if (value == 1 || value == 2) {
            this.educationTypeShow = false;
        } else {
            this.educationTypeShow = true;
        }
    }

}
