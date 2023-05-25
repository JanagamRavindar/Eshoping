import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { NgxPaginationModule } from 'ngx-pagination'
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireDatabaseModule } from '@angular/fire/compat/database';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { environment } from 'src/environments/environment.development';
import { UsersComponent } from './users/users.component';
import { SignupComponent } from './signup/signup.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { ProductsComponent } from './products/products.component';
import { UsersService } from './services/users.service';
import { AuthService } from './services/auth.service';
import { ProductsService } from './services/products.service';
import { CatagoryComponent } from './catagory/catagory.component';
import { CatagoryService } from './services/catagory.service';
import { CartItemsService } from './services/cart-items.service';
import { CartItemsComponent } from './cart-items/cart-items.component';
import { CheckOutComponent } from './check-out/check-out.component';
import { OrderSuccessComponent } from './order-success/order-success.component';
import { MyorderComponent } from './myorder/myorder.component';
import { OrderDetailsComponent } from './order-details/order-details.component';
import { AdminOrdersComponent } from './admin-orders/admin-orders.component';
import { UnauthorisedComponent } from './unauthorised/unauthorised.component';
import { AdminGuard } from './guards/adminguard';
import { AuthGuard } from './guards/authguard';



const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'home', component: HomeComponent },
  { path: 'users', component: UsersComponent, canActivate: [AdminGuard] },
  { path: 'signup', component: SignupComponent },
  { path: 'login', component: LoginComponent },
  { path: 'products', component: ProductsComponent, canActivate: [AdminGuard] },
  { path: 'catagory', component: CatagoryComponent, canActivate: [AdminGuard] },
  { path: 'cart-items', component: CartItemsComponent, canActivate: [AdminGuard, AuthGuard] },
  { path: 'check-out', component: CheckOutComponent, canActivate: [AdminGuard, AuthGuard] },
  { path: 'ordersuccess', component: OrderSuccessComponent, canActivate: [AdminGuard, AuthGuard] },
  { path: 'myorder', component: MyorderComponent, canActivate: [AdminGuard, AuthGuard] },
  { path: 'admin/adminorders', component: AdminOrdersComponent, canActivate: [AdminGuard] },
  { path: 'order-details/:id', component: OrderDetailsComponent },
  { path: 'unauthorised', component: UnauthorisedComponent },

]
@NgModule({
  declarations: [
    AppComponent,
    UsersComponent,
    SignupComponent,
    LoginComponent,
    HomeComponent,
    ProductsComponent,
    CatagoryComponent,
    CartItemsComponent,
    CheckOutComponent,
    OrderSuccessComponent,
    MyorderComponent,
    OrderDetailsComponent,
    AdminOrdersComponent,
    UnauthorisedComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgxPaginationModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    FormsModule,
    ToastrModule.forRoot({ positionClass: 'toast-bottom-right' }),
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireDatabaseModule,
    AngularFirestoreModule,
    RouterModule.forRoot(routes)

  ],
  providers: [UsersService, AuthService, ProductsService, CatagoryService, CartItemsService, AdminGuard, AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
