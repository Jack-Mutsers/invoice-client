import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CustomersComponent } from './components/customers/customers.component';
import { ProductsComponent } from './components/products/products.component';
import { ProductcategoriesComponent } from './components/productcategories/productcategories.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { ReactiveFormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { faPencilAlt } from '@fortawesome/free-solid-svg-icons';
import { HomeComponent } from './components/home/home.component';
import { UseraccountComponent } from './components/useraccount/useraccount.component';
import { ConnectionsComponent } from './components/connections/connections.component';
import { CompanyComponent } from './components/company/company.component';
import { AlertComponent } from './_directives/alert.component';
import { AuthGuard } from './_helpers';
import { AlertService, AuthenticationService, UserService } from './_services';
import { CompanyLayoutComponent } from './layouts/company-layout/company-layout.component';
import { HomeLayoutComponent } from './layouts/home-layout/home-layout.component';
import { LoginLayoutComponent } from './layouts/login-layout/login-layout.component';
import { JwtInterceptor, ErrorInterceptor } from './_helpers';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { CompanyregistrationComponent } from './components/companyregistration/companyregistration.component';
import { InvoicesComponent } from './components/invoices/invoices.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule  } from '@angular/material/button';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { UserInvoicesComponent } from './components/user-invoices/user-invoices.component';

@NgModule({
  declarations: [
    AppComponent,
    AlertComponent,
    CustomersComponent,
    ProductsComponent,
    ProductcategoriesComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    UseraccountComponent,
    ConnectionsComponent,
    CompanyComponent,
    CompanyLayoutComponent,
    HomeLayoutComponent,
    LoginLayoutComponent,
    CompanyregistrationComponent,
    InvoicesComponent,
    UserInvoicesComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FontAwesomeModule,
    BrowserAnimationsModule,
    MatToolbarModule,  
    MatIconModule,  
    MatButtonModule,  
    MatCardModule,  
    MatProgressBarModule
  ],
  providers: [
    AuthGuard,
    AlertService,
    AuthenticationService,
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
    UserService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { 
  constructor(){
    library.add(faTrash,faPencilAlt);
  }
}
