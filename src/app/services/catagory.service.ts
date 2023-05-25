import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { CatagoryModel } from '../models/catagory.model';

@Injectable({ providedIn: 'root' })
export class CatagoryService {

  constructor(private fireStore: AngularFirestore) { }

  create(catagory: CatagoryModel) {
    return this.fireStore.collection('catagories').add({ ...catagory });
  }
  read() {
    return this.fireStore.collection('catagories').snapshotChanges();
  }
  update(id: string, catagory: CatagoryModel) {
    return this.fireStore.doc('catagories/' + id).update({ ...catagory });
  }
  delete(id: string) {
    return this.fireStore.doc('catagories/' + id).delete();
  }
  getById(id: string) {
    return this.fireStore.doc<CatagoryModel>('catagories/' + id).valueChanges();
  }

}
