import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './services/auth.service';
import { Observable } from 'rxjs';
import { CartItemsService } from './services/cart-items.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Eshoping';

  cartItemCount$: Observable<number>;

  constructor(private router: Router, public authServices: AuthService, private cartService: CartItemsService) {
    this.cartItemCount$ = cartService.cartCount$;
  }

  logout() {
    localStorage.removeItem('displayUsername');
    localStorage.removeItem('loggedUserId');
    localStorage.removeItem('isAdmin');
    this.cartService.clearCartItems();
    this.router.navigate(['/login']);

  }
}
