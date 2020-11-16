import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { UsersRoutingModule } from './users-routing.module';
import { LayoutComponent } from './layout.component';
import { BasicInfoComponent } from './basic-info.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { AddtionalInfoComponent } from './addtional-info/addtional-info.component';
import { EducationComponent } from './education/education.component';
import { ProfExpComponent } from './prof-exp/prof-exp.component';
import { TaxInfoComponent } from './tax-info/tax-info.component';
import { FinAccountsComponent } from './fin-accounts/fin-accounts.component';
import { EducationAddComponent } from './education-add/education-add.component';
import { CertificationComponent } from './certification/certification.component';
import { CertificationAddComponent } from './certification-add/certification-add.component';

@NgModule({
    imports: [
        CommonModule,
        ReactiveFormsModule,
        UsersRoutingModule
    ],
    declarations: [
        LayoutComponent,
        BasicInfoComponent,
        UserProfileComponent,
        AddtionalInfoComponent,
        EducationComponent,
        ProfExpComponent,
        TaxInfoComponent,
        FinAccountsComponent,
        EducationAddComponent,
        CertificationComponent,
        CertificationAddComponent
    ]
})
export class UsersModule { }