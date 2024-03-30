import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Type } from 'src/app/shared/models/type';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class TypesService {
  baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  getTypes(){
    return this.http.get<Type[]>(this.baseUrl+'producttypes');
  }

  getType(id: number){
    return this.http.get<Type>(this.baseUrl+'producttypes/'+id);
  }

  createType(type:Type){
    return this.http.post<Type>(this.baseUrl+'producttypes/create', type);
  }

  updateType(type:Type){
    return this.http.put<Type>(this.baseUrl+'producttypes/update', type);
  }

  deleteType(id: number){
    return this.http.delete<Type>(this.baseUrl+'producttypes/delete/'+id);
  }
}
