import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';

import { AccountService, AlertService } from '@app/_services';
import { LoginComponent } from './login.component';

@Component({
  selector: 'app-register-basic',
  templateUrl: './register-basic.component.html'
})
export class RegisterBasicComponent implements OnInit {

	form: FormGroup;
    loading = false;
    submitted = false;
    step = 1;
    public userDatas:any = [];
    public registration_id;
    public username;
    public password;

    fileData: File = null;
	previewUrl:any = null;
	fileUploadProgress: string = null;
	uploadedFilePath: string = null;

  	constructor(
  		private formBuilder: FormBuilder,
    	private route: ActivatedRoute,
   	 	private router: Router,
    	private accountService: AccountService,
    	private alertService: AlertService
    ) { 
  		this.registration_id = localStorage.getItem("reg_id");
  		this.username = Math.random().toString(36).substring(7);
  		this.password = Math.random().toString(36).substring(7);
    }

  	ngOnInit() {
        this.form = this.formBuilder.group({
        	registration_id: this.registration_id,
        	username: this.username,
        	password: this.password,
        	password_confirm: this.password,
            applyas: ['2'],
            title: ['', [Validators.required]],
            first_name: ['', [Validators.required]],
            middle_name: [''],
            last_name: ['', [Validators.required]],
            dob: ['', [Validators.required, Validators.pattern(/^\d{4}\-(0[1-9]|1[012])\-(0[1-9]|[12][0-9]|3[01])$/)]],
            pseudoName: ['', [Validators.required]],
            govtId: ['', [Validators.required]],
            idProofNo: ['', [Validators.required]]
        });
    }

    // convenience getter for easy access to form fields
    get f() { return this.form.controls; }

    fileProgress(fileInput: any) {
      	this.fileData = <File>fileInput.target.files[0];
      	this.preview();
	}
	 	
	preview() {
	    // Show preview 
	    var mimeType = this.fileData.type;
	    if (mimeType.match(/image\/*/) == null) {
	      return;
	    }
	 
	    var reader = new FileReader();      
	    reader.readAsDataURL(this.fileData); 
	    reader.onload = (_event) => { 
	      this.previewUrl = reader.result; 
	    }
	}

    onSubmit() {
        this.submitted = true;

        // reset alerts on submit
        this.alertService.clear();

        // stop here if form is invalid
        if (this.form.invalid) {
            return;
        }

        let data = JSON.parse(JSON.stringify(this.form.value));
	    // data['fileData'] = this.previewUrl;
	    // console.log(data);
        this.loading = true;
        this.accountService.register(data).subscribe(response => {
                console.log(response);
                this.userDatas = response;
                if (this.userDatas.success == '0') {
                    this.alertService.error(this.userDatas.errors);
                    this.loading = false;
                } else {
                    this.alertService.success('Account sucessfully created, Login credentials send to your email!', { keepAfterRouteChange: true });
                    localStorage.removeItem('reg_id')
                    // localStorage.setItem("reg_id", this.userDatas.reg_id);
                    this.router.navigate(['../login'], { relativeTo: this.route });
                }
            }, (data) => {
                this.alertService.error('General error has occurred');
                this.loading = false;
        });
    }

    onReset() {
        this.submitted = false;
        this.form.reset();
    }
}
