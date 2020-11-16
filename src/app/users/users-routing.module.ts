import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LayoutComponent } from './layout.component';
import { BasicInfoComponent } from './basic-info.component';
import { AddtionalInfoComponent } from './addtional-info/addtional-info.component';
import { EducationComponent } from './education/education.component';
import { EducationAddComponent } from './education-add/education-add.component';
import { ProfExpComponent } from './prof-exp/prof-exp.component';
import { TaxInfoComponent } from './tax-info/tax-info.component';
import { FinAccountsComponent } from './fin-accounts/fin-accounts.component';
import { CertificationComponent } from './certification/certification.component';
import { CertificationAddComponent } from './certification-add/certification-add.component';

const routes: Routes = [
    {
        path: '', component: LayoutComponent,
        children: [
            { path: '', component: BasicInfoComponent },
            { path: 'addtional-info', component: AddtionalInfoComponent },
            { path: 'education', component: EducationComponent },
            { path: 'education/education-add', component: EducationAddComponent },
            { path: 'education/education-edit/:id', component: EducationAddComponent },
            { path: 'certification', component: CertificationComponent },
            { path: 'certification/certification-add', component: CertificationAddComponent },
            { path: 'professional-experience', component: ProfExpComponent },
            { path: 'tax', component: TaxInfoComponent },
            { path: 'financial', component: FinAccountsComponent }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class UsersRoutingModule { }