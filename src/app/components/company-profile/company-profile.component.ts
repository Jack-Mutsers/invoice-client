import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertService, CompanyService } from '../../_services';
import { Company, User } from 'src/app/_models';

@Component({
  selector: 'app-company-profile',
  templateUrl: './company-profile.component.html',
  styleUrls: ['./company-profile.component.css']
})
export class CompanyProfileComponent implements OnInit {
  companyForm: FormGroup;
  formCompany: Company = new Company();
  employeeList: User = new User();
  companyName: string = "";
  owner: boolean = false;
  loading = false;
  submitted = false;

  constructor(
    private apiService: CompanyService,
    private router: Router,
    private formBuilder: FormBuilder,
    private alertService: AlertService
  ) { }

  ngOnInit(): void {
    this.LoadCompany();

    this.companyForm = this.formBuilder.group({
      id: ['', Validators.required],
      name: ['', Validators.required],
      address: ['', Validators.required],
      zipcode: ['', [Validators.required, Validators.pattern("[1-9][0-9]{3} ? ?(?!sa|sd|ss)[a-zA-Z]{2}")]],
      city: ['', [Validators.required]],
      telephoneNumber: ['', [Validators.required, Validators.minLength(10), Validators.pattern("(?=.*[0-9]).{10,}")]]
    });
  }

  // convenience getter for easy access to form fields
  get f() { return this.companyForm.controls; }

  onSubmit(){
    this.submitted = true;

    // stop here if form is invalid
    if (this.companyForm.invalid) {
      return;
    }

    this.apiService.update(this.formCompany).subscribe(
      data => {
        this.companyName = data.body.name;
        var accountData = JSON.parse(localStorage.getItem('currentUser'));
        accountData.company = data.body;
        localStorage.setItem('currentUser', JSON.stringify(accountData));
        this.loading = false;
        this.submitted = false;
      },
      error => {
        console.log(error);
        this.alertService.error(error);
        this.loading = false;
      }
    );
  }

  onDelete(){
    if(this.owner){
      this.apiService.delete().subscribe(
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

  LoadCompany(){
    var accountData = JSON.parse(localStorage.getItem('currentUser'));
    this.formCompany.loadFromObject(accountData.company, accountData.companyId);
    this.owner = accountData.company.ownerId == accountData.id;
    this.companyName = accountData.company.name;

    this.apiService.getEmployees().subscribe(
      data => {
        this.employeeList = data;
      },
      error => {
        console.log(error);
        this.alertService.error(error);
      }
    );
  }

}
