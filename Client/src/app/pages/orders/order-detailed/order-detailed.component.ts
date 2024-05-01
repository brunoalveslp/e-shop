import { HttpClient } from '@angular/common/http';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Order } from 'src/app/shared/models/order';
import { OrdersService } from '../orders.service';

@Component({
  selector: 'app-order-detailed',
  templateUrl: './order-detailed.component.html',
  styleUrls: ['./order-detailed.component.scss']
})
export class OrderDetailedComponent implements OnInit, OnDestroy {
  order?: Order;

  constructor(private activatedRoute: ActivatedRoute,
    private ordersService: OrdersService) {}

  ngOnInit(): void {
    this.getOrderById();
  }

  getOrderById() {
    const id = this.activatedRoute.snapshot.paramMap.get('id');
    if (id) {
      this.ordersService.getOrderById(+id).subscribe({
        next: order => {
          this.order = order;
          console.log(order)
        },
        error: error => console.log(error)
      });
    }
  }

  ngOnDestroy(): void {
    // Unsubscribe from any subscriptions to prevent memory leaks
  }
}
