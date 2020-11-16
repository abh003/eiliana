import { Component } from '@angular/core';

import { User } from '@app/_models';
import { AccountService } from '@app/_services';
import Swal from 'sweetalert2/dist/sweetalert2.js';

@Component({ templateUrl: 'layout.component.html' })
export class LayoutComponent { 
	public user;
	public publicAnonymus;

	fileData: File = null;
	previewUrl:any = null;

    constructor(private accountService: AccountService) {
        this.user = this.accountService.userValue;
        // console.log(this.user);
    }

    changeAnonymus(e) {
		this.publicAnonymus = e.target.value;
		this.accountService.publicAnonymusUpdate(this.user.id,this.publicAnonymus).subscribe(res => {
      		// this.apiNotifyO = res;
      		let localStorageJsonData = this.user;
	        localStorageJsonData.anonymous = this.publicAnonymus;
	        localStorage.setItem("user", JSON.stringify(localStorageJsonData));
	        Swal.fire({
              icon: 'success',
              title: 'Success...',
              text: 'Updated successfully',
              showConfirmButton: false,
              timer: 1500
            })
    	}); 
	}

	onFileChanged(fileInput: any) {
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

}