import { Injectable } from '@angular/core';
import { UsersModel } from '../models/users.model';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Injectable({ providedIn: 'root' })
export class UsersService {

  constructor(private fireStore: AngularFirestore ) { }

  create(users: UsersModel) {
      return this.fireStore.collection('users').add({...users});            
  } 
  read() {
    return this.fireStore.collection('users').snapshotChanges();
  }
  update(id:string, user: UsersModel) {
    return this.fireStore.doc('users/' + id ).update({...user});
  }
  delete(id:string) {
    return this.fireStore.doc('users/' + id ).delete();
  }
  getById(id:string) {
    return this.fireStore.doc<UsersModel>('users/' + id).valueChanges();
  }
}


