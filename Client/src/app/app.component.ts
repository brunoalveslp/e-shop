import { Component, OnInit } from '@angular/core';
import { AccountService } from './pages/account/account.service';
import { CartService } from './pages/cart/cart.service';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'E-Shop';
  constructor(private cartService: CartService, private accountService: AccountService){}

  ngOnInit(): void {
    this.loadCurrentUser();
    this.loadCart();
  }

  loadCart(){
    const cartId = localStorage.getItem('cart_id');
    if(cartId){
      this.cartService.getCart(cartId);
    }
  }

  loadCurrentUser(){
    const token = localStorage.getItem('token');

    this.accountService.loadCurrentUser(token).subscribe();
  }
}
