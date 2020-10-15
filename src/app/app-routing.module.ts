import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CustomersComponent } from './customers/customers.component';
import { LoginComponent } from './login/login.component';
import { ProductcategoriesComponent } from './productcategories/productcategories.component';
import { ProductsComponent } from './products/products.component';
import { UseraccountsComponent } from './useraccounts/useraccounts.component';
import { UsersComponent } from './users/users.component';

const routes: Routes = [
  {path:'customers', component: CustomersComponent},
  {path:'products', component: ProductsComponent},
  {path:'productcategories', component: ProductcategoriesComponent},
  {path:'users', component: UsersComponent},
  {path:'login', component: LoginComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
