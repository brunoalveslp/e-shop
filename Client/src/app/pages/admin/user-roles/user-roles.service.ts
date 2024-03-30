import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Role, UpdateRole } from 'src/app/shared/models/roles';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class UserRolesService {
  baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  getRoles(){
    return this.http.get<Role[]>(this.baseUrl+'account/roles');
  }

  getRole(id: string){
    return this.http.get<Role>(this.baseUrl+'account/roles/'+id);
  }

  createRole(role: string){
    return this.http.post<Role>(this.baseUrl+'account/add-role', role);
  }

  updateRole(id: string, updatedRole: string){
    const params = new HttpParams({"id": id, "updatedRole": updatedRole});
    return this.http.put<UpdateRole>(this.baseUrl+`account/update-role`, params);
  }

  deleteRole(id: string){
    return this.http.delete<Role>(this.baseUrl+'account/roles/'+id);
  }
}
