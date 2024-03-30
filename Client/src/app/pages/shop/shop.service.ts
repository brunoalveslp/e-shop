import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Brand } from 'src/app/shared/models/brand';
import { Pagination } from 'src/app/shared/models/pagination';
import { Product } from 'src/app/shared/models/product';
import { ShopParams } from 'src/app/shared/models/shopParams';
import { Size } from 'src/app/shared/models/size';
import { Type } from 'src/app/shared/models/type';
import { environment } from 'src/environments/environment.development';


@Injectable({
  providedIn: 'root'
})
export class ShopService {
  private baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) {

  }

  getSizes(){
    return this.http.get<Size[]>(this.baseUrl+'sizes');
  }

  getProducts(shopParams: ShopParams){
    let params = new HttpParams;

    if(shopParams.brandId > 0){
      params = params.append('brandId', shopParams.brandId);
    }

    if(shopParams.typeId > 0){
      params = params.append('typeId', shopParams.typeId);
    }

    params = params.append('sort', shopParams.sort);
    params = params.append('pageIndex', shopParams.pageNumber);
    params = params.append('pageSize', shopParams.pageSize);

    if(shopParams.search) params = params.append('search', shopParams.search);

    return this.http.get<Pagination>(this.baseUrl+'stock/products', { params });
  }

  getProduct(id: number){
    return this.http.get<Product>(this.baseUrl+'stock/products/'+id);
  }

  getTypes(){
    return this.http.get<Type[]>(this.baseUrl+'producttypes');
  }

  getBrands(){
    return this.http.get<Brand[]>(this.baseUrl+'productbrands');
  }
}
