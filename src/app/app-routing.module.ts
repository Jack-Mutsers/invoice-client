import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './_guards';
import { LoginComponent } from './components/login/login.component';
import { LoginLayoutComponent } from './layouts/login-layout/login-layout.component';
import { HomeComponent } from './components/home/home.component';
import { HomeLayoutComponent } from './layouts/home-layout/home-layout.component';
import { CustomersComponent } from './components/customers/customers.component';
import { ProductcategoriesComponent } from './components/productcategories/productcategories.component';
import { ProductsComponent } from './components/products/products.component';
import { RegisterComponent } from './components/register/register.component';

const routes: Routes = [
  {path:'', component: HomeLayoutComponent, canActivate: [AuthGuard], children: [
    {path:'customers', component: CustomersComponent},
    {path:'products', component: ProductsComponent},
    {path:'productcategories', component: ProductcategoriesComponent},
    {path:'', component: HomeComponent}
  ]},
  {path:'', component: LoginLayoutComponent, children: [
    {path:'login', component: LoginComponent},
    {path:'register', component: RegisterComponent}
  ]},
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
