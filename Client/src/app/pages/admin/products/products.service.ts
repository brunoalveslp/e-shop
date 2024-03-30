import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Product} from 'src/app/shared/models/product';
import { ProductToCreate } from 'src/app/shared/models/productToCreate';
import { Size } from 'src/app/shared/models/size';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  getSizes(){
    return this.http.get<Size[]>(this.baseUrl+'sizes');
  }

  getProducts(){
    return this.http.get<Product[]>(this.baseUrl+'stock/products');
  }

  getProduct(id: number){
    return this.http.get<Product>(this.baseUrl+'stock/products/'+id);
  }

  createProduct(product:FormData){
    return this.http.post(this.baseUrl+'stock/create-product', product);
  }

  updateProduct(product:FormData){
    return this.http.put(this.baseUrl+'stock/update-product', product);
  }

  deleteProduct(id: number){
    return this.http.delete(this.baseUrl+'stock/delete-product/'+id);
  }
}
