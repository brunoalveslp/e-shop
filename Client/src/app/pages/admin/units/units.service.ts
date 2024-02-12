import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Unit } from 'src/app/shared/models/unit';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class UnitsService {

  baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  getUnits(){
    return this.http.get<Unit[]>(this.baseUrl+'productunits');
  }

  getUnit(id: number){
    return this.http.get<Unit>(this.baseUrl+'productunits/'+id);
  }

  createUnit(unit:Unit){
    return this.http.post<Unit>(this.baseUrl+'productunits/create', unit);
  }

  updateUnit(unit:Unit){
    return this.http.post<Unit>(this.baseUrl+'productunits/update', unit);
  }

  deleteUnit(id: number){
    return this.http.delete<Unit>(this.baseUrl+'productunits/delete/'+id);
  }
}
