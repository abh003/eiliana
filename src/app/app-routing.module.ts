import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home';
import { FrontPageComponent } from './front-page/front-page.component'
import { AuthGuard } from './_helpers';

const accountModule = () => import('./account/account.module').then(x => x.AccountModule);
const usersModule = () => import('./users/users.module').then(x => x.UsersModule);
const portfolioModule = () => import('./portfolio/portfolio.module').then(x => x.PortfolioModule);
const projectModule = () => import('./projects/project.module').then(x => x.ProjectModule);

const routes: Routes = [
    { path: '', component: FrontPageComponent },
    { path: 'home', component: HomeComponent, canActivate: [AuthGuard] },
    { path: 'profile', loadChildren: usersModule, canActivate: [AuthGuard] },
    { path: 'portfolio', loadChildren: portfolioModule, canActivate: [AuthGuard] },
    { path: 'project', loadChildren: projectModule, canActivate: [AuthGuard] },
    { path: 'account', loadChildren: accountModule },

    // otherwise redirect to home
    { path: '**', redirectTo: '' }
];

@NgModule({
    imports: [RouterModule.forRoot(routes, {onSameUrlNavigation: 'reload'})],
 	exports: [RouterModule],
})
export class AppRoutingModule { }