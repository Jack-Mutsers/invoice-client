import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CustomersComponent } from './customers/customers.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { ProductcategoriesComponent } from './productcategories/productcategories.component';
import { ProductsComponent } from './products/products.component';
import { RegisterComponent } from './register/register.component';
import { AuthGuard } from './_guards';

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
