import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertService, CustomerService } from '../_services';
import { Customer } from '../_models/customer';
import { first } from 'rxjs/operators';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
// import { faFilm } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.css']
})

export class CustomersComponent implements OnInit {
  customerForm: FormGroup;
  customers: Customer[];
  loading = false;
  submitted = false;
  trashIcon = faTrash;

  constructor(
    private apiService: CustomerService,
    private router: Router,
    private formBuilder: FormBuilder,
    private alertService: AlertService
  ) { }

  ngOnInit(): void {
    this.loadCustomers();

    this.customerForm = this.formBuilder.group({
      name: ['', Validators.required],
      address: ['', Validators.required],
      zipcode: ['', Validators.required],
      city: ['', [Validators.required]]
    });
  }

  // convenience getter for easy access to form fields
  get f() { return this.customerForm.controls; }

  onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.customerForm.invalid) {
        return;
    }

    this.loading = true;
    this.apiService.addCustomer(this.customerForm.value)
      .pipe(first())
      .subscribe(
        data => {
          this.alertService.success('Registration successful', true);
          this.loading = false;
          this.loadCustomers();
          this.submitted = false;
          this.customerForm.reset();
        },
        error => {
          this.alertService.error(error);
          this.loading = false;
        }
      );

  }

  onDelete(id){
    console.log(id);
    this.apiService.delete(id).subscribe(
      data => {
        this.loadCustomers();
      }
    );
  }

  private loadCustomers(){
    this.apiService.getCustomers().subscribe((data)=>{
      console.log(data);
      this.customers = <Customer[]> data;
    });
  }
}