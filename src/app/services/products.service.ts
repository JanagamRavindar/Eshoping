import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { ProductModel } from '../models/product.model';

@Injectable({ providedIn: 'root' })
export class ProductsService {

  constructor(private fireStore: AngularFirestore) { }

  create(product: ProductModel) {
    return this.fireStore.collection('products').add({ ...product });
  }
  read(searchTerm: string, categary: string = '') {
    if (searchTerm && categary)
      return this.fireStore.collection('products', ref => ref.where('catagories', '==', categary).orderBy('title').startAt(searchTerm).endAt(`${searchTerm}\uf8ff`)).snapshotChanges();
    else if (categary)
      return this.fireStore.collection('products', ref => ref.where('catagories', '==', categary)).snapshotChanges();
    else if (searchTerm)
      return this.fireStore.collection('products', ref => ref.orderBy('title').startAt(searchTerm).endAt(`${searchTerm}\uf8ff`)).snapshotChanges();
    else
      return this.fireStore.collection('products').snapshotChanges();
  }
  update(id: string, product: ProductModel) {
    return this.fireStore.doc('products/' + id).update({ ...product });
  }
  delete(id: string) {
    return this.fireStore.doc('products/' + id).delete();
  }
  getById(id: string) {
    return this.fireStore.doc<ProductModel>('products/' + id).valueChanges();
  }
}
