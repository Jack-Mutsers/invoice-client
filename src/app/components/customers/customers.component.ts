import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertService, CustomerService } from '../../_services';
import { Customer } from '../../_models/customer';
import { first } from 'rxjs/operators';
import { faTrash, faPencilAlt } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.css']
})

export class CustomersComponent implements OnInit {
  customerForm: FormGroup;
  customers: Customer[];
  deleteCustomer: Customer = new Customer();
  alterationTile: string = "Add new";
  formCustomer: Customer = new Customer();
  loading = false;
  submitted = false;
  trashIcon = faTrash;
  pencilIcon = faPencilAlt;
  companyId = JSON.parse(localStorage.getItem('currentUser')).companyId;

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

    var customer = this.customerForm.value;
    customer.companyId = this.companyId;
    
    this.loading = true;
    let id = this.customerForm.value.id;
    if(id == 0 || id == null || id == undefined){
      this.apiService.addCustomer(customer)
        .pipe(first())
        .subscribe(
          data => {
            console.log(data.message);
            this.alertService.success(data.message, true);
            this.loading = false;
            this.loadCustomers();
            this.submitted = false;
            // this.customerForm.reset();
            this.formCustomer = new Customer();
          },
          error => {
            console.log(error.message);
            this.alertService.error(error.message);
            this.loading = false;
          }
        );
    }else{
      this.apiService.update(customer)
        .pipe(first())
        .subscribe(
          data => {
            console.log(data.message);
            this.alertService.success(data.message, true);
            this.loading = false;
            this.loadCustomers();
            this.submitted = false;
            // this.customerForm.reset();
            this.formCustomer = new Customer();
            this.alterationTile = "Add new";
          },
          error => {
            console.log(error.message);
            this.alertService.error(error.message);
            this.loading = false;
          }
        );
    }

  }

  onEdit(id){
    this.apiService.getCustomer(id, this.companyId).subscribe((data)=>{
      this.formCustomer = <Customer> data;
      this.alterationTile = "Update";
    });
  }

  onDelete(id){
    this.apiService.delete(id, this.companyId).subscribe(
      data => {
        console.log(data.message);
        this.alertService.success(data.message, true);
        this.loadCustomers();
      },
      error => {
        console.log(error.message);
        this.alertService.error(error.message);
      }
    );
  }

  onSetDeleteData(id){
    this. deleteCustomer = this.customers.filter(x => x.id === id)[0];
  }

  private loadCustomers(){
    this.apiService.getCustomers(this.companyId).subscribe((data)=>{
      this.customers = <Customer[]> data;
    });
  }
}