import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http : HttpClient) { }

  postUser(data:any){
    return this.http.post <any> ("http://localhost:3000/users",data)
  }
  getUser(){
    return this.http.get <any> ("http://localhost:3000/users");
  }
  getCurrentUser(id:any){
    return this.http.get <any> ('http://localhost:3000/users/'+id);
  }
  updateUser(id:any,data:any){
    return this.http.put('http://localhost:3000/users/'+id,data);
  }
  deleteUser(id:any){
    return this.http.delete('http://localhost:3000/users/'+id);
  }
}
