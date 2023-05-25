import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { OrderModel } from '../models/oder.model';

@Injectable({ providedIn: 'root' })
export class OrderService {

  constructor(private fireStore: AngularFirestore) { }
  create(_orders: OrderModel) {
    return this.fireStore.collection('orders').add({ ..._orders });
  }
  getUserOders(userId: string) {
    return this.fireStore.collection('orders', ref => ref.where('userId', '==', userId)).snapshotChanges();
  }
  getAdminOders() {
    return this.fireStore.collection('orders').snapshotChanges();
  }
  getById(id: string) {
    return this.fireStore.doc('orders/' + id).valueChanges();
  }
  delete(id: string) {
    return this.fireStore.doc('orders/' + id).delete();
  }
}
