import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomepageComponent } from './pages/homepage/homepage.component';
import { LoginpageComponent } from './pages/loginpage/loginpage.component';
import { UserpageComponent } from './pages/userpage/userpage.component';
import {AuthorizeGuardService} from './services/authorize-guard.service'
const routes: Routes = [
  { path: '', pathMatch: "full", component: HomepageComponent },
  { path: 'login', component: LoginpageComponent },
    { path: 'user', component:UserpageComponent , canActivate: [AuthorizeGuardService]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
