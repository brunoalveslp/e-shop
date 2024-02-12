import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Product } from 'src/app/shared/models/product';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  getProducts(){
    return this.http.get<Product[]>(this.baseUrl+'stock/products');
  }

  getProduct(id: number){
    return this.http.get<Product>(this.baseUrl+'stock/products/'+id);
  }

  createProduct(type:Product){
    return this.http.post<Product>(this.baseUrl+'stock/products/create-product', type);
  }

  updateProduct(type:Product){
    return this.http.post<Product>(this.baseUrl+'stock/products/update-product', type);
  }

  deleteProduct(id: number){
    return this.http.delete<Product>(this.baseUrl+'stock/products/delete-product/'+id);
  }
}
