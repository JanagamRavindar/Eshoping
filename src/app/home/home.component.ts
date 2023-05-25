import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../services/products.service';
import { ProductModel } from '../models/product.model';
import { CatagoryModel } from '../models/catagory.model';
import { CatagoryService } from '../services/catagory.service';
import { CartItemsService } from '../services/cart-items.service';
import { CartItemsModel } from '../models/cart.model';

@Component({
  selector: 'home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  products: ProductModel[] = [];
  catagories: CatagoryModel[] = [];
  selectedCatagary: string = '';
  searchTerm: string;

  constructor(private pService: ProductsService, private catagary: CatagoryService, private cartService: CartItemsService) { }
  ngOnInit(): void {
    this.loadProduct();
    this.loadCatagary();
  }
  loadProduct() {
    this.pService.read(this.searchTerm, this.selectedCatagary).subscribe(response => {
      this.products = response.map((data) => {
        return {
          id: data.payload.doc.id,
          ...data.payload.doc.data() as ProductModel
        }
      });
    })
  }

  loadCatagary() {
    this.catagary.read().subscribe(response => {
      this.catagories = response.map((data) => {
        return {
          id: data.payload.doc.id,
          ...data.payload.doc.data() as CatagoryModel
        }
      })
    })
  }

  changeCategary($event: any) {
    if ($event.target.selectedIndex > 0)
      this.selectedCatagary = this.catagories[$event.target.selectedIndex - 1].name!;
    else
      this.selectedCatagary = '';
    this.loadProduct();
  }

  addToCart(_product: ProductModel) {
    let _cartItem = _product as CartItemsModel;
    _cartItem.quantity = 1;
    _cartItem.totalPrice = _cartItem.quantity * _cartItem.price;
    this.cartService.addItemToCart(_cartItem);
  }

  removeFromCart(_product: ProductModel) {
    let _cartItem = _product as CartItemsModel;
    _cartItem.quantity = -1;
    this.cartService.removeItemFromCart(_cartItem);
  }

  getQuantity(_product: ProductModel) {
    let _itemQty: number = 0;
    this.cartService.CartItems.filter(item => item.id === _product.id).forEach(_item => { _itemQty += _item.quantity });
    return _itemQty;
  }
}
