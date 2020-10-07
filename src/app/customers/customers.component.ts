import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertService, CustomerService } from '../_services';
import { Customer } from '../_models/customer';
import { first } from 'rxjs/operators';
import { faTrash, faPencilAlt } from '@fortawesome/free-solid-svg-icons';
// import { faFilm } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.css']
})

export class CustomersComponent implements OnInit {
  customerForm: FormGroup;
  customers: Customer[];
  formCustomer: Customer = new Customer(0, null, null, null, null);
  loading = false;
  submitted = false;
  trashIcon = faTrash;
  pencilIcon = faPencilAlt;

  constructor(
    private apiService: CustomerService,
    private router: Router,
    private formBuilder: FormBuilder,
    private alertService: AlertService
  ) { }

  ngOnInit(): void {
    this.loadCustomers();

    this.customerForm = this.formBuilder.group({
      id: ['', Validators.required],
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
    let id = this.customerForm.value.id;
    if(id == 0 || id == null || id == undefined){
      this.apiService.addCustomer(this.customerForm.value)
        .pipe(first())
        .subscribe(
          data => {
            this.alertService.success('Registration successful', true);
            this.loading = false;
            this.loadCustomers();
            this.submitted = false;
            this.customerForm.reset();
            console.log(this.formCustomer);
          },
          error => {
            this.alertService.error(error);
            this.loading = false;
          }
        );
    }else{
      this.apiService.update(id, this.customerForm.value)
        .pipe(first())
        .subscribe(
          data => {
            this.alertService.success('Update successful', true);
            this.loading = false;
            this.loadCustomers();
            this.submitted = false;
            this.customerForm.reset();
            console.log(this.formCustomer);
          },
          error => {
            this.alertService.error(error);
            this.loading = false;
          }
        );
    }

  }

  onEdit(id){
    this.apiService.getCustomer(id).subscribe((data)=>{
      console.log(data);
      this.formCustomer = <Customer> data;
    });
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