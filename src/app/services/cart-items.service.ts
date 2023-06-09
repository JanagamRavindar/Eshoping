import { Injectable } from '@angular/core'
import { CartItemsModel } from '../models/cart.model';
import { AuthService } from './auth.service';
import { BehaviorSubject } from 'rxjs';
@Injectable({ providedIn: 'root' })

export class CartItemsService {
  private cartItems: CartItemsModel[] = [];
  private _cartItemsQuantity: number = 0;
  private _cartItemsTotal: number = 0;

  private cartCount = new BehaviorSubject<number>(0);
  cartCount$ = this.cartCount.asObservable();

  constructor(private authService: AuthService) {
    this.loadCartItems();
  }
  get CartItems() { this.loadCartItems(); return this.cartItems; }
  get CartItemsCount() { return this._cartItemsQuantity; }
  get CartItemsTotal() { return this._cartItemsTotal }

  addItemToCart(_cartItem: CartItemsModel) {
    this.loadCartItems();

    const _itemIndex = this.cartItems.findIndex(x => x.id === _cartItem.id);

    if (_itemIndex > -1) {
      this.cartItems[_itemIndex].quantity += 1;
      this.cartItems[_itemIndex].totalPrice = this.cartItems[_itemIndex].quantity * this.cartItems[_itemIndex].price;
    }
    else
      this.cartItems.push(_cartItem);
    this.saveCartItem();
  }
  removeItemFromCart(_cartItem: CartItemsModel) {
    this.loadCartItems();
    const _itemIndex = this.cartItems.findIndex(x => x.id === _cartItem.id && x.quantity > 1);
    if (_itemIndex > -1) {
      this.cartItems[_itemIndex].quantity += -1;
      this.cartItems[_itemIndex].totalPrice = this.cartItems[_itemIndex].quantity * this.cartItems[_itemIndex].price;
    }
    else {
      let _index = this.cartItems.findIndex(x => x.id === _cartItem.id);
      this.cartItems.splice(_index, 1);
    }
    this.saveCartItem();
  }
  clearCartItems() {
    let cartItemsStorageKey = this.authService.displayUserId + 'cart_items';
    let cartItemsCountKey = this.authService.displayUserId + 'cart_count';
    localStorage.removeItem(cartItemsStorageKey);
    localStorage.removeItem(cartItemsCountKey);
    this.loadCartItems();
  }
  loadCartItems() {
    let cartItemsStorageKey = this.authService.displayUserId + 'cart_items';
    this.cartItems = JSON.parse(localStorage.getItem(cartItemsStorageKey) || '[]');

    let _totalQty = 0;
    this.cartItems.forEach(_item => { _totalQty += _item.quantity });

    this.cartCount.next(_totalQty);

    let _totalPrice = 0;
    this.cartItems.forEach(_item => { _totalPrice += _item.totalPrice });

    this._cartItemsQuantity = _totalQty;
    this._cartItemsTotal = _totalPrice;
  }
  saveCartItem() {
    let cartItemsStorageKey = this.authService.displayUserId + 'cart_items';
    let cartItemsCountKey = this.authService.displayUserId + 'cart_count';

    localStorage.setItem(cartItemsStorageKey, JSON.stringify(this.cartItems));
    let _totalQty = 0;
    this.cartItems.forEach(_item => { _totalQty += _item.quantity });

    this.cartCount.next(_totalQty);

    localStorage.setItem(cartItemsCountKey, _totalQty.toString());


  }
}