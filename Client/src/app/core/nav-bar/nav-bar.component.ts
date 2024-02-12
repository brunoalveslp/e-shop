import { Component, OnInit } from '@angular/core';
import { AccountService } from 'src/app/pages/account/account.service';
import { CartService } from 'src/app/pages/cart/cart.service';
import { CartItem } from 'src/app/shared/models/cart';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent implements OnInit {

  constructor(public cartService: CartService,
      public accountService: AccountService,
   ){

      }

  ngOnInit(): void {
  }

  getCount(items: CartItem[]){
    return items.reduce((sum, item) => sum + item.quantity, 0);
  }
}
