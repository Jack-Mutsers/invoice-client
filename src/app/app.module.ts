import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { CustomersComponent } from './customers/customers.component';
import { ProductsComponent } from './products/products.component';
import { ProductcategoriesComponent } from './productcategories/productcategories.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ReactiveFormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { faPencilAlt } from '@fortawesome/free-solid-svg-icons';
import { HomeComponent } from './home/home.component';
import { UseraccountComponent } from './useraccount/useraccount.component';
import { ConnectionsComponent } from './connections/connections.component';
import { CompanyComponent } from './company/company.component';

@NgModule({
  declarations: [
    AppComponent,
    CustomersComponent,
    ProductsComponent,
    ProductcategoriesComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    UseraccountComponent,
    ConnectionsComponent,
    CompanyComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FontAwesomeModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { 
  constructor(){
    library.add(faTrash,faPencilAlt);
  }
}
