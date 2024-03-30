import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Size } from 'src/app/shared/models/size';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class ProductSizesService {
  baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  getSizes(){
    return this.http.get<Size[]>(this.baseUrl+'sizes');
  }

  getSize(id: number){
    return this.http.get<Size>(this.baseUrl+'sizes/'+id);
  }

  createSize(size:Size){
    return this.http.post<Size>(this.baseUrl+'sizes/create', size);
  }

  updateSize(size:Size){
    return this.http.put<Size>(this.baseUrl+'sizes/update', size);
  }

  deleteSize(id: number){
    return this.http.delete<Size>(this.baseUrl+'sizes/delete/'+id);
  }
}
