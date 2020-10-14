import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { ProductCategory } from '../_models/productcategory';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertService, ProductCategoryService } from '../_services';
import { first } from 'rxjs/operators';
import { faTrash, faPencilAlt } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-productcategories',
  templateUrl: './productcategories.component.html',
  styleUrls: ['./productcategories.component.css']
})

export class ProductcategoriesComponent implements OnInit {
  productcategoryForm: FormGroup;
  productCatogories: ProductCategory[];
  deleteProductCategory: ProductCategory = new ProductCategory(0, null, null);
  alterationTile: string = "Add new";
  formProductCategory: ProductCategory = new ProductCategory(0, null, null);
  loading = false;
  submitted = false;
  trashIcon = faTrash;
  pencilIcon = faPencilAlt;

  constructor(
    private apiService: ProductCategoryService,
    private router: Router,
    private formBuilder: FormBuilder,
    private alertService: AlertService
  ) { }

  ngOnInit(): void {
    this.loadProductCategories();

    this.productcategoryForm = this.formBuilder.group({
      id: ['', Validators.required],
      name: ['', Validators.required],
      btw: ['', Validators.required],
    });
  }

  // convenience getter for easy access to form fields
  get f() { return this.productcategoryForm.controls; }

  onSubmit() {
    this.submitted = true;
    
    // stop here if form is invalid
    if (this.productcategoryForm.invalid) {
      console.log("Form input invalid");
      return;
    }
    
    console.log("test");
    this.loading = true;
    let id = this.productcategoryForm.value.id;
    if(id == 0 || id == null || id == undefined){
      this.apiService.addProductCategory(this.productcategoryForm.value)
        .pipe(first())
        .subscribe(
          data => {
            this.alertService.success('Registration successful', true);
            this.loading = false;
            this.loadProductCategories();
            this.submitted = false;
            // this.productcategoryForm.reset();
            this.formProductCategory = new ProductCategory(0, null, null);
            console.log(this.formProductCategory);
          },
          error => {
            this.alertService.error(error);
            this.loading = false;
          }
        );
    }else{
      this.apiService.update(id, this.productcategoryForm.value)
        .pipe(first())
        .subscribe(
          data => {
            this.alertService.success('Update successful', true);
            this.loading = false;
            this.loadProductCategories();
            this.submitted = false;
            // this.productcategoryForm.reset();
            this.formProductCategory = new ProductCategory(0, null, null);
            this.alterationTile = "Add new";
            console.log(this.formProductCategory);
          },
          error => {
            this.alertService.error(error);
            this.loading = false;
          }
        );
    }

  }

  onEdit(id){
    this.apiService.getProductCategory(id).subscribe((data)=>{
      //console.log(data);
      this.formProductCategory = <ProductCategory> data;
      this.alterationTile = "Update";
    });
  }

  onDelete(id){
    //console.log(id);
    this.apiService.delete(id).subscribe(
      data => {
        this.loadProductCategories();
      }
    );
  }

  onSetDeleteData(id){
    this. deleteProductCategory = this.productCatogories.filter(x => x.id === id)[0];
    //console.log(this.deleteProductCategory);
  }

  private loadProductCategories(){
    this.apiService.getProductCategorys().subscribe((data)=>{
      //console.log(data);
      this.productCatogories = <ProductCategory[]> data;
    });
  }

}
