import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Product } from 'src/app/shared/models/product';
import { Size } from 'src/app/shared/models/size';
import { StockMoviment } from 'src/app/shared/models/stockMoviment';
import { environment } from 'src/environments/environment.development';
import { ShopParams } from '../../../shared/models/shopParams';
import { Pagination } from '../../../shared/models/pagination';


//
@Injectable({
  providedIn: 'root'
})
export class StockService {
  private baseUrl = environment.apiUrl; // Substitua por sua URL base da API

  constructor(private http: HttpClient) { }

  getSizes(){
    return this.http.get<Size[]>(this.baseUrl+'sizes');
  }

  getProducts(shopParams: ShopParams) {
    let params = new HttpParams;

    if (shopParams.brandId > 0) {
      params = params.append('brandId', shopParams.brandId);
    }

    if (shopParams.typeId > 0) {
      params = params.append('typeId', shopParams.typeId);
    }

    params = params.append('sort', shopParams.sort);
    params = params.append('pageIndex', shopParams.pageNumber);
    params = params.append('pageSize', shopParams.pageSize);

    if (shopParams.search) params = params.append('search', shopParams.search);

    return this.http.get<Pagination>(this.baseUrl + 'stock/products', { params });
  }

  getStockMovimentation() {
    const url = `${this.baseUrl}stock/stock-moviments`;
    return this.http.get<StockMoviment[]>(url);
  }

  getStockMovimentationByProduct(id: number) {
    const url = `${this.baseUrl}stock/stock-moviments/${id}`;
    return this.http.get<StockMoviment[]>(url);
  }

  stockEntry(productId: number, sizeId: number, quantity: number) {
    const url = `${this.baseUrl}stock/stock-entry`;
    return this.http.post(url, { productId, sizeId, quantity });
  }

  stockOutgoing(productId: number, sizeId: number, quantity: number) {
    const url = `${this.baseUrl}stock/stock-outgoing`;
    return this.http.post(url, { productId, sizeId, quantity });
  }
}

