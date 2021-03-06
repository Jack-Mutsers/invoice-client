import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './_helpers';
import { LoginComponent } from './components/login/login.component';
import { LoginLayoutComponent } from './layouts/login-layout/login-layout.component';
import { HomeComponent } from './components/home/home.component';
import { CompanyLayoutComponent } from './layouts/company-layout/company-layout.component';
import { HomeLayoutComponent } from './layouts/home-layout/home-layout.component';
import { CustomersComponent } from './components/customers/customers.component';
import { ProductcategoriesComponent } from './components/productcategories/productcategories.component';
import { ProductsComponent } from './components/products/products.component';
import { RegisterComponent } from './components/register/register.component';
import { CompanyregistrationComponent } from './components/companyregistration/companyregistration.component';
import { Role } from './_models';
import { InvoicesComponent } from './components/invoices/invoices.component';
import { UserInvoicesComponent } from './components/user-invoices/user-invoices.component';
import { UserProfileComponent } from './components/user-profile/user-profile.component';
import { CompanyProfileComponent } from './components/company-profile/company-profile.component';

const routes: Routes = [
  {path:'company', component: CompanyLayoutComponent, canActivate: [AuthGuard], data: { roles: [Role.Owner, Role.Employee] }, children: [
    {path:'customers', component: CustomersComponent},
    {path:'products', component: ProductsComponent},
    {path:'productcategories', component: ProductcategoriesComponent},
    {path:'invoices', component: InvoicesComponent},
    {path:'profile', component: UserProfileComponent},
    {path:'company', component: CompanyProfileComponent},
    {path:'', component: HomeComponent}
  ]},
  {path:'', component: HomeLayoutComponent, canActivate: [AuthGuard], data: { roles: [Role.User] }, children: [
    {path:'register-company', component: CompanyregistrationComponent},
    {path:'invoices', component: UserInvoicesComponent},
    {path:'profile', component: UserProfileComponent},
    {path:'', component: HomeComponent}
  ]},
  {path:'', component: LoginLayoutComponent, children: [
    {path:'login', component: LoginComponent},
    {path:'register', component: RegisterComponent}
  ]},
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })],
  exports: [RouterModule]
})

export class AppRoutingModule { }
