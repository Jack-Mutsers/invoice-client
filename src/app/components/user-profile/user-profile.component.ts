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
  confirmPassword: string = "";
  deletePassword: string = "";
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
    // stop here if form is invalid
    if (this.userForm.invalid) {
      return;
    }

    this.formUserAccount.user = this.formUser;
    
    this.sendUpdate();
  }

  onSubmitPasswordUpdate(){
    if(this.userAccountForm.invalid || !this.passwordsMatch){
      return;
    }

    this.sendUpdate();
  }

  sendUpdate(){
    this.submitted = true;

    this.apiService.update(this.formUserAccount.id, this.formUserAccount).subscribe(
      data => {
        localStorage.setItem('currentUser', JSON.stringify(data));
        this.loading = false;
        this.submitted = false;
        this.formUserAccount.password = "";
        this.confirmPassword = "";
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

  onDelete(){
    if(this.deletePassword != null && this.deletePassword.trim() != ""){
      this.apiService.delete(this.formUserAccount.id, this.deletePassword).subscribe(
        data => {
          console.log(data);
          this.alertService.success(data);
          this.router.navigate(["/login"]);
        },
        error => {
          console.log(error);
          this.alertService.error(error);
        }
      );
    }
  }

  onChangeDeletePassword(e){
    this.deletePassword = e.target.value;
  }

  LoadUser(){
    var accountData = JSON.parse(localStorage.getItem('currentUser'));
    this.formUserAccount.loadFromObject(accountData);
    this.formUser.loadFromObject(this.formUserAccount.user)
  }
}