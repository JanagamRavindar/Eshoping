import { Component, OnInit } from '@angular/core';
import { OrderModel } from '../models/oder.model';
import { OrderService } from '../services/order.service';

@Component({
  selector: 'myorder',
  templateUrl: './myorder.component.html',
  styleUrls: ['./myorder.component.css']
})
export class MyorderComponent implements OnInit {

  currentPage: number = 1;
  myOrders: OrderModel[] = [];

  constructor(private orderService: OrderService) {

  }
  ngOnInit(): void {
    this.loadData();
  }
  loadData() {
    let userId = localStorage.getItem('loggedUserId');

    this.orderService.getUserOders(userId!)
      .subscribe(response => {
        this.myOrders = response.map((data) => {
          return {
            id: data.payload.doc.id,
            ...data.payload.doc.data() as OrderModel
          }
        });
      })
  }
}
