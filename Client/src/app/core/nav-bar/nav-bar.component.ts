import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AccountService } from 'src/app/pages/account/account.service';
import { CartService } from 'src/app/pages/cart/cart.service';
import { Cart, CartItem } from 'src/app/shared/models/cart';
import { User } from 'src/app/shared/models/user';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent implements OnInit {

  cartSource$: Observable<Cart | null>;
  currentUser$: Observable<User | null>;

  constructor(public cartService: CartService,
      public accountService: AccountService,
   ){}

  ngOnInit(): void {
      this.cartSource$ = this.cartService.cartSource$;
      this.currentUser$ = this.accountService.currentUserSource$;
  }

  getCount(items: CartItem[]){
    return items.reduce((sum, item) => sum + item.quantity, 0);
  }
}
