import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Brand } from 'src/app/shared/models/brand';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class BrandsService {
  baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  getBrands(){
    return this.http.get<Brand[]>(this.baseUrl+'productbrands');
  }

  getBrand(id: number){
    return this.http.get<Brand>(this.baseUrl+'productbrands/'+id);
  }

  createBrand(brand:Brand){
    return this.http.post<Brand>(this.baseUrl+'productbrands/create', brand);
  }

  updateBrand(brand:Brand){
    return this.http.post<Brand>(this.baseUrl+'productbrands/update', brand);
  }

  deleteBrand(id: number){
    return this.http.delete<Brand>(this.baseUrl+'productbrands/delete/'+id);
  }
}
