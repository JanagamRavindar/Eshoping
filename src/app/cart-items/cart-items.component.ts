import { Component, OnInit } from '@angular/core';
import { CartItemsModel } from '../models/cart.model';
import { CartItemsService } from '../services/cart-items.service';
import { Router } from '@angular/router';
import { ProductModel } from '../models/product.model';

@Component({
  selector: 'cart-items',
  templateUrl: './cart-items.component.html',
  styleUrls: ['./cart-items.component.css']
})
export class CartItemsComponent implements OnInit {

  cartItems: CartItemsModel[] = [];

  constructor(private cartService: CartItemsService, private routes: Router) { }

  ngOnInit(): void {
    this.cartItems = this.cartService.CartItems;
  }
  clearCart() {
    this.cartService.clearCartItems();
    this.cartItems = this.cartService.CartItems;
  }
  checkOut() {
    this.routes.navigate(['/check-out']);
  }
  addToCart(_cartItem: CartItemsModel) {
    this.cartService.addItemToCart(_cartItem);
    this.cartItems = this.cartService.CartItems;
  }
  removeFromCart(_cartItem: CartItemsModel) {
    this.cartService.removeItemFromCart(_cartItem);
    this.cartItems = this.cartService.CartItems;
  }
  getQuantity(_product: ProductModel) {
    let itemQty: number = 0;
    this.cartService.CartItems.filter(item => item.id === _product.id).forEach(_item => { itemQty += _item.quantity });
    return itemQty;
  }

  get totalPrice() {
    return this.cartService.CartItemsTotal;
  }
  get totalItemsCount() {
    return this.cartService.CartItemsCount;
  }

}
