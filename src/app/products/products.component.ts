import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../services/products.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { ProductModel } from '../models/product.model';
import { CatagoryModel } from '../models/catagory.model';
import { CatagoryService } from '../services/catagory.service';

@Component({
  selector: 'products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

  currentPage: number = 1;
  products: ProductModel[] = [];
  product = new ProductModel();
  Title = '';
  searTerm: string;
  catagaries: CatagoryModel[] = [];
  catagiry = new CatagoryModel();
  showLoader: boolean = false;


  constructor(private productService: ProductsService, private toastr: ToastrService, private routes: Router, private catgaryService: CatagoryService) { }

  addProduct() {
    this.Title = 'Add Product';
    this.product = new ProductModel();
  }
  updateProduct(_product: ProductModel) {
    this.Title = 'Update Product';
    this.product = _product;
  }

  submitMethod() {
    if (this.product.id) {
      this.productService.update(this.product.id, this.product).then((response) => {
        this.toastr.success('Updated successfully..!!');
      });
    }
    else {
      this.productService.create(this.product).then((response) => {
        this.toastr.success('Added successfully..!!');
      })
    }
  }
  deleteProduct(id: any) {
    if (confirm('Are you sure to delete this item..!!'))
      this.productService.delete(id).then((response) => {
        this.toastr.success('Delete successfully..!!');
      });
  }

  ngOnInit(): void {
    this.loadProducts();
    this.loadCatagaries();
  }
  loadProducts() {
    this.showLoader = true;
    this.productService.read(this.searTerm).subscribe(response => {
      this.products = response.map((data) => {
        return {
          id: data.payload.doc.id,
          ...data.payload.doc.data() as ProductModel
        }
      });
      this.showLoader = false;
    });
  }
  loadCatagaries() {
    this.catgaryService.read().subscribe(response => {
      this.catagaries = response.map((data) => {
        return {
          id: data.payload.doc.id,
          ...data.payload.doc.data() as CatagoryModel
        }
      });
    });
  }
  filterData() {
    this.loadProducts();
  }

}
