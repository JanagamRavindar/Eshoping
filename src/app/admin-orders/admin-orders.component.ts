import { Component, OnInit } from '@angular/core';
import { OrderModel } from '../models/oder.model';
import { OrderService } from '../services/order.service';
import { ToastrService } from 'ngx-toastr';



@Component({
  selector: 'adminorders',
  templateUrl: './admin-orders.component.html',
  styleUrls: ['./admin-orders.component.css']
})
export class AdminOrdersComponent implements OnInit {
  currentPage: number = 1;
  adminOrders: OrderModel[] = [];

  constructor(public orderService: OrderService, private toastr: ToastrService) { }

  ngOnInit(): void {
    this.loadData();
  }
  loadData() {
    this.orderService.getAdminOders().subscribe(response => {
      this.adminOrders = response.map((data) => {
        return {
          id: data.payload.doc.id,
          ...data.payload.doc.data() as OrderModel
        }
      })
    })
  }

  delete(id: any) {
    this.orderService.delete(id).then((response) => {
      this.toastr.success('Delete success..');
    })
  }

}
