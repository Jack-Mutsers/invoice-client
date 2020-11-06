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
  {path:'customers', component: CustomersComponent, canActivate: [AuthGuard]},
  {path:'products', component: ProductsComponent, canActivate: [AuthGuard]},
  {path:'productcategories', component: ProductcategoriesComponent, canActivate: [AuthGuard]},
  {path:'register', component: RegisterComponent},
  {path:'login', component: LoginComponent},
  {path:'', component: HomeComponent, canActivate: [AuthGuard]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
