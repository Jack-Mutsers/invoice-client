import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
declare var $: any;

import { AlertService, CompanyService } from '../../_services';
import { Company, UserAccount, Role } from '../../_models';
import { from } from 'rxjs';

@Component({
  selector: 'app-companyregistration',
  templateUrl: './companyregistration.component.html',
  styleUrls: ['./companyregistration.component.css']
})
export class CompanyregistrationComponent implements OnInit {
  registerForm: FormGroup;
  loading = false;
  submitted = false;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private service: CompanyService,
    private alertService: AlertService) { }

  ngOnInit(): void {
    this.registerForm = this.formBuilder.group({
      name: ['', Validators.required],
      address: ['', Validators.required],
      zipcode: ['', Validators.required],
      city: ['', Validators.required],
      telephoneNumber: ['', Validators.required],
    });
  }

  // convenience getter for easy access to form fields
  get f() { return this.registerForm.controls; }

  onSubmit() {
      this.submitted = true;

      // stop here if form is invalid
      if (this.registerForm.invalid) {
          return;
      }

      var company = new Company();
      company.loadFromForm(this.registerForm.value);
      var userAccount = $.extend(new UserAccount(), JSON.parse(localStorage.getItem('currentUser')));

      console.log(userAccount);

      this.loading = true;
      this.service.addCompany(company, userAccount.userId)
        .pipe(first())
        .subscribe(
          data => {
            userAccount.role = Role.Owner;
            localStorage.setItem('currentUser', JSON.stringify(userAccount));
            this.router.navigate(["/company/"]);
          },
          error => {
            console.log(error);
            this.alertService.error(error);
            this.loading = false;
          }
        );
  }
}
