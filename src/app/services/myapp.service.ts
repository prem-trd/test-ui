import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class MyappService {

  constructor(private http:HttpClient) { }
  postform(data){
    return this.http.post('http://localhost:3000/app/registerdata',data);
  }
  getdata(){
    return this.http.get('http://localhost:3000/app/registerlist');
  }
  addgetdata(){
    return this.http.get('http://localhost:3000/app/addlist'); 
  }
  login(data){
    return this.http.post('http://localhost:3000/app/login',data);
  }
  deletedata(data){
    return this.http.post('http://localhost:3000/app/deletelist',data);
  }
  updatedata(data){
    return this.http.put('http://localhost:3000/app/updatelist',data);
  }
  adform(data){
    return this.http.post('http://localhost:3000/app/adddata',data);
  }

}
