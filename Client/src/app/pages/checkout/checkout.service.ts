import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.development';
import { map } from 'rxjs';
import { Order, OrderToCreate } from '../../shared/models/order';
import { DeliveryMethod } from 'src/app/shared/models/deliveryMethod';

@Injectable({
  providedIn: 'root'
})
export class CheckoutService {
  baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  createOrder(order: OrderToCreate){
    return this.http.post<Order>(this.baseUrl+'orders',order);
  }

  getDeliveryMethods(){
    return this.http.get<DeliveryMethod[]>(this.baseUrl+ 'orders/deliverymethods').pipe(
      map(dm => {
        return dm.sort((a,b) => b.price - a.price)
      })
    );
  }
}
