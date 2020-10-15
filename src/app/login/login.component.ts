import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertService, UserAccountService } from '../_services';
import { UserAccount } from '../_models/useraccount';
import { first } from 'rxjs/operators';
import { User } from '../_models/user';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {
  userAccountForm: FormGroup;
  formUserAccount: UserAccount = new UserAccount();
  loading = false;
  submitted = false;

  constructor(
    private apiService: UserAccountService,
    private router: Router,
    private formBuilder: FormBuilder,
    private alertService: AlertService
  ) { }

  ngOnInit(): void {
    this.userAccountForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  // convenience getter for easy access to form fields
  get f() { return this.userAccountForm.controls; }

  onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.userAccountForm.invalid) {
        return;
    }

    this.loading = true;

    this.apiService.Login(this.userAccountForm.value)
      .pipe(first())
      .subscribe(
        data => {
          console.log(data);
          this.alertService.success('login send', true);
          this.loading = false;
          this.submitted = false;
          this.formUserAccount = new UserAccount();
        },
        error => {
          this.alertService.error(error);
          this.loading = false;
        }
      );

  }
}
