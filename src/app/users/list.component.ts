import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';

import { AccountService, AlertService } from '@app/_services';

@Component({ templateUrl: 'list.component.html' })
export class ListComponent implements OnInit {
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

    fileData: File = null;
    previewUrl:any = null;
    fileUploadProgress: string = null;
    uploadedFilePath: string = null;

    constructor(private formBuilder: FormBuilder,
        private route: ActivatedRoute,
        private router: Router,
        private accountService: AccountService,
        private alertService: AlertService) {
        this.user = this.accountService.userValue;
    }

    ngOnInit() {
        // this.accountService.getAll()
        //     .pipe(first())
        //     .subscribe(users => this.users = users);
        this.form = this.formBuilder.group({
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

    deleteUser(id: string) {
        const user = this.users.find(x => x.id === id);
        user.isDeleting = true;
        this.accountService.delete(id)
            .pipe(first())
            .subscribe(() => this.users = this.users.filter(x => x.id !== id));
    }

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