import { Component, OnInit } from '@angular/core';
import { Product } from '../../_models/product';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertService, ProductCategoryService, ProductService } from '../../_services';
import { first } from 'rxjs/operators';
import { faTrash, faPencilAlt } from '@fortawesome/free-solid-svg-icons';
import { ProductCategory } from '../../_models/productcategory';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})

export class ProductsComponent implements OnInit {
  productForm: FormGroup;
  products: Product[];
  productCategories: ProductCategory[];
  deleteProduct: Product = new Product();
  alterationTile: string = "Add new";
  formProduct: Product = new Product();
  loading = false;
  submitted = false;
  trashIcon = faTrash;
  pencilIcon = faPencilAlt;

  constructor(
    private productApiService: ProductService,
    private categoryApiService: ProductCategoryService,
    private router: Router,
    private formBuilder: FormBuilder,
    private alertService: AlertService
  ) { }

  ngOnInit(): void {
    this.loadProducts();
    this.loadProductCategories();

    this.productForm = this.formBuilder.group({
      id: ['', Validators.required],
      name: ['', Validators.required],
      price: ['', Validators.required],
      productCode: ['', Validators.required],
      categoryId: ['', Validators.required],
    });
  }

  // convenience getter for easy access to form fields
  get f() { return this.productForm.controls; }

  onSubmit() {
    this.submitted = true;
    
    // stop here if form is invalid
    if (this.productForm.invalid) {
      return;
    }
    
    this.loading = true;
    let id = this.productForm.value.id;
    if(id == 0 || id == null || id == undefined){
      this.productApiService.addProduct(this.productForm.value)
        .pipe(first())
        .subscribe(
          data => {
            console.log(data.message);
            this.alertService.success(data.message, true);
            this.loading = false;
            this.loadProductCategories();
            this.submitted = false;
            // this.productForm.reset();
            this.formProduct = new Product();
          },
          error => {
            console.log(error.message);
            this.alertService.error(error.message);
            this.loading = false;
          }
        );
    }else{
      this.productApiService.update(this.productForm.value)
        .pipe(first())
        .subscribe(
          data => {
            console.log(data.message);
            this.alertService.success(data.message, true);
            this.loading = false;
            this.loadProductCategories();
            this.submitted = false;
            // this.productForm.reset();
            this.formProduct = new Product();
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
    this.productApiService.getProduct(id).subscribe((data)=>{
      this.formProduct = <Product> data;
      this.alterationTile = "Update";
    });
  }

  onDelete(id){
    this.productApiService.delete(id).subscribe(
      data => {
        console.log(data.message);
        this.alertService.success(data.message, true);
        this.loadProductCategories();
      },
      error => {
        console.log(error.message);
        this.alertService.error(error.message);
      }
    );
  }

  onSetDeleteData(id){
    this. deleteProduct = this.products.filter(x => x.id === id)[0];
  }

  private loadProducts(){
    this.productApiService.getProducts().subscribe((data)=>{
      this.products = <Product[]> data;
    });
  }

  private loadProductCategories(){
    this.categoryApiService.getProductCategorys().subscribe((data)=>{
      this.productCategories = <ProductCategory[]> data;
    });
  }
}
