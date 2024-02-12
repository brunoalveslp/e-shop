import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Order } from 'src/app/shared/models/order';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class OrdersService {
  baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  getOrders(){
    return this.http.get<Order[]>(this.baseUrl+'orders');
  }

  getOrderById(id: number){
    return this.http.get<Order>(this.baseUrl+'orders/'+id);
  }
}
