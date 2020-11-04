import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LayoutComponent } from './layout.component';
import { LoginComponent } from './login.component';
import { RegisterComponent } from './register.component';
import { RegisterotpComponent } from './registerotp.component';
import { RegisterBasicComponent } from './register-basic.component';
import { LoginFirstComponent } from './login-first/login-first.component';

const routes: Routes = [
    {
        path: '', component: LayoutComponent,
        children: [
            { path: 'login', component: LoginComponent },
            { path: 'register', component: RegisterComponent },
            { path: 'registerotp', component: RegisterotpComponent },
            { path: 'registerbasic', component: RegisterBasicComponent },
            { path: 'loginfirst', component: LoginFirstComponent }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class AccountRoutingModule { }