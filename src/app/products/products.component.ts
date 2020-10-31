import { Component, OnInit } from '@angular/core';
import { Product } from '../_models/product';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertService, ProductService } from '../_services';
import { first } from 'rxjs/operators';
import { faTrash, faPencilAlt } from '@fortawesome/free-solid-svg-icons';


@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})

export class ProductsComponent implements OnInit {
  productForm: FormGroup;
  products: Product[];
  deleteProduct: Product = new Product();
  alterationTile: string = "Add new";
  formProduct: Product = new Product();
  loading = false;
  submitted = false;
  trashIcon = faTrash;
  pencilIcon = faPencilAlt;

  constructor(
    private apiService: ProductService,
    private router: Router,
    private formBuilder: FormBuilder,
    private alertService: AlertService
  ) { }

  ngOnInit(): void {
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
      this.apiService.addProduct(this.productForm.value)
        .pipe(first())
        .subscribe(
          data => {
            this.alertService.success('Registration successful', true);
            this.loading = false;
            this.loadProductCategories();
            this.submitted = false;
            // this.productForm.reset();
            this.formProduct = new Product();
          },
          error => {
            this.alertService.error(error);
            this.loading = false;
          }
        );
    }else{
      this.apiService.update(this.productForm.value)
        .pipe(first())
        .subscribe(
          data => {
            this.alertService.success('Update successful', true);
            this.loading = false;
            this.loadProductCategories();
            this.submitted = false;
            // this.productForm.reset();
            this.formProduct = new Product();
            this.alterationTile = "Add new";
          },
          error => {
            this.alertService.error(error);
            this.loading = false;
          }
        );
    }

  }

  onEdit(id){
    this.apiService.getProduct(id).subscribe((data)=>{
      this.formProduct = <Product> data;
      this.alterationTile = "Update";
    });
  }

  onDelete(id){
    this.apiService.delete(id).subscribe(
      data => {
        this.loadProductCategories();
      }
    );
  }

  onSetDeleteData(id){
    this. deleteProduct = this.products.filter(x => x.id === id)[0];
  }

  private loadProductCategories(){
    this.apiService.getProducts().subscribe((data)=>{
      this.products = <Product[]> data;
    });
  }

}
