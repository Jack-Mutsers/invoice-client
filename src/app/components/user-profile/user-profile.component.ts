import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { AlertService, UserAccountService, UserService } from '../../_services';
import { User, UserAccount } from 'src/app/_models';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {
  userForm: FormGroup;
  userAccountForm: FormGroup;
  formUser: User = new User();
  formUserAccount: UserAccount = new UserAccount();
  confirmPassword: String = "";
  passwordsMatch: boolean = true;
  loading = false;
  submitted = false;

  constructor(
    private apiService: UserAccountService,
    private router: Router,
    private formBuilder: FormBuilder,
    private alertService: AlertService
  ) { }

  ngOnInit(): void {
    this.LoadUser();

    this.userForm = this.formBuilder.group({
      id: ['', Validators.required],
      name: ['', Validators.required],
      address: ['', Validators.required],
      zipcode: ['', Validators.required],
      city: ['', [Validators.required]]
    });

    this.userAccountForm = this.formBuilder.group({
      id: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  

  // convenience getter for easy access to form fields
  get uf() { return this.userForm.controls; }
  get uaf() { return this.userAccountForm.controls; }

  onSubmitUser(){

  }

  onSubmitPasswordUpdate(){
    if(!this.passwordsMatch){return;}


    console.log("valid");
  }

  onChangeConfirmPassword(){
    this.passwordsMatch = this.confirmPassword == this.formUserAccount.password;
  }

  LoadUser(){
    var accountData = JSON.parse(localStorage.getItem('currentUser'));
    this.formUserAccount.loadFromObject(accountData);
    this.formUser.loadFromObject(this.formUserAccount.user)
  }
}