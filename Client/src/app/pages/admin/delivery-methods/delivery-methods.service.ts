import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DeliveryMethod } from 'src/app/shared/models/deliveryMethod';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class DeliveryMethodsService {

  baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  getDeliveryMethods(){
    return this.http.get<DeliveryMethod[]>(this.baseUrl+'deliverymethod');
  }

  getDeliveryMethod(id: number){
    return this.http.get<DeliveryMethod>(this.baseUrl+'deliverymethod/'+id);
  }

  createDeliveryMethod(deliveryMethod:DeliveryMethod){
    return this.http.post<DeliveryMethod>(this.baseUrl+'deliverymethod/create', deliveryMethod);
  }

  updateDeliveryMethod(deliveryMethod:DeliveryMethod){
    return this.http.post<DeliveryMethod>(this.baseUrl+'deliverymethod/update', deliveryMethod);
  }

  deleteDeliveryMethod(id: number){
    return this.http.delete<DeliveryMethod>(this.baseUrl+'deliverymethod/delete/'+id);
  }
}
