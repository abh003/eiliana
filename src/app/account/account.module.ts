import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { AccountRoutingModule } from './account-routing.module';
import { LayoutComponent } from './layout.component';
import { LoginComponent } from './login.component';
import { RegisterComponent } from './register.component';
import { RegisterotpComponent } from './registerotp.component';
import { RegisterBasicComponent } from './register-basic.component';
import { LoginFirstComponent } from './login-first/login-first.component';

@NgModule({
    imports: [
        CommonModule,
        ReactiveFormsModule,
        AccountRoutingModule
    ],
    declarations: [
        LayoutComponent,
        LoginComponent,
        RegisterComponent,
        RegisterotpComponent,
        RegisterBasicComponent,
        LoginFirstComponent
    ]
})
export class AccountModule { }