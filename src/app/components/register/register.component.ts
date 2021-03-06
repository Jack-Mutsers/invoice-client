import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';

import { AlertService, UserAccountService, UserService } from '../../_services';
import { UserAccount } from '../../_models';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  formUserAccount: UserAccount = new UserAccount();
  confirmPassword: string = "";
  passwordsMatch: boolean = true;
  loading = false;
  submitted = false;

  constructor(
      private formBuilder: FormBuilder,
      private router: Router,
      private service: UserAccountService,
      private alertService: AlertService) { }

  ngOnInit() {
      this.registerForm = this.formBuilder.group({
          name: ['', Validators.required],
          address: ['', Validators.required],
          zipcode: ['', Validators.required],
          city: ['', Validators.required],
          username: ['', Validators.required],
          password: ['', [Validators.required, Validators.minLength(6)]]
      });
  }

  // convenience getter for easy access to form fields
  get f() { return this.registerForm.controls; }

  onSubmit() {
      this.submitted = true;

      // stop here if form is invalid
      if (this.registerForm.invalid || !this.passwordsMatch) {
          return;
      }

      this.loading = true;
      this.service.addUserAccount(this.formUserAccount)
        .pipe(first())
        .subscribe(
          data => {
            this.router.navigate(["/"]);
          },
          error => {
            console.log(error);
            this.alertService.error(error);
            this.loading = false;
          }
        );
  }


  onChangeConfirmPassword(){
    this.passwordsMatch = this.confirmPassword == this.formUserAccount.password;
  }

}
