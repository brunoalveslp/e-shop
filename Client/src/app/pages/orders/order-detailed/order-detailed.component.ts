import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Order } from 'src/app/shared/models/order';
import { OrdersService } from '../orders.service';
import { BreadcrumbService } from 'xng-breadcrumb';

@Component({
  selector: 'app-order-detailed',
  templateUrl: './order-detailed.component.html',
  styleUrls: ['./order-detailed.component.scss']
})
export class OrderDetailedComponent implements OnInit {
  order?: Order;
  constructor(private activatedRoute: ActivatedRoute,
    private ordersService: OrdersService,
    private bcService: BreadcrumbService)
    {
      bcService.set('@order', '');
    }


  ngOnInit(): void {
    this.getOrderById();
  }

  getOrderById(){
    const id = this.activatedRoute.snapshot.paramMap.get('id');
    this.bcService.set('@order', `Order #${id}`);

    if(id) this.ordersService.getOrderById(+id).subscribe({
      next: order => this.order = order
    });
  }
}
