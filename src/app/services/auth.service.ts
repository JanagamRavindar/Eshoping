import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { UsersModel } from '../models/users.model';

@Injectable({ providedIn: 'root' })
export class AuthService {

   constructor(private fierStore: AngularFirestore) { }

   validate(email: string, password: string) {
      return this.fierStore.collection('users', ref => ref.where('email', '==', email).where('password', '==', password)).snapshotChanges();
   }
   signUp(userModel: UsersModel) {
      return this.fierStore.collection('users').add({ ...userModel });
   }
   read() {
      return this.fierStore.collection('users').snapshotChanges();
   }
   get displayUserId() {
      return localStorage.getItem('loggedUserId');
   }
   get displayUsername() {
      return localStorage.getItem('displayUsername');
   }
   get isAdmin(): boolean {
      return localStorage.getItem('isAdmin') === 'true';
   }

}
