import { Component, OnInit } from '@angular/core';
import { CartItemsService } from '../services/cart-items.service';
import { CartItemsModel } from '../models/cart.model';
import { ShippingModel } from '../models/shipping.model';
import { OrderModel } from '../models/oder.model';
import { OrderService } from '../services/order.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'check-out',
  templateUrl: './check-out.component.html',
  styleUrls: ['./check-out.component.css']
})
export class CheckOutComponent implements OnInit {

  _cartItems: CartItemsModel[] = [];
  shipping = new ShippingModel();

  constructor(private cartService: CartItemsService,
    private oderService: OrderService,
    private routes: Router,
    private toastr: ToastrService) { }

  ngOnInit(): void {
    this._cartItems = this.cartService.CartItems;
  }
  get totalPrice() {
    return this.cartService.CartItemsTotal;
  }
  get totalItemCount() {
    return this.cartService.CartItemsCount;
  }
  PlaceOrder() {
    let order = new OrderModel();

    order.datePlaced = new Date().getTime();
    order.amount = this.cartService.CartItemsTotal;
    order.userId = localStorage.getItem('loggedUserId')!;
    order.items = this._cartItems;
    order.shppingDetails = {
      name: this.shipping.name,
      addressLine1: this.shipping.addressLine1,
      addressLine2: this.shipping.addressLine2,
      city: this.shipping.city
    };

    this.oderService.create(order).then((response) => {
      this.cartService.clearCartItems()
      this.toastr.success('Order placed successfully...!');
      this.routes.navigate(['/ordersuccess'])
    })
      .catch((errro: any) => {
        this.toastr.error('Un-handel expectation occured...!')
      })
  }

}


