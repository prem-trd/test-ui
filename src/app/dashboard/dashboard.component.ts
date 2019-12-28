import { Component, OnInit } from '@angular/core';

import { Router} from '@angular/router';
import { MyappService } from '../services/myapp.service';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  onedata:any;
  twodata: any;
  constructor(private router:Router,private http:MyappService) { }

  ngOnInit() {
    this.getstudentdata();
  }
getstudentdata(){
 this.http.getdata().subscribe(data =>{
   this.onedata = data;
   console.log("onedata",this.onedata,data);
 })
}
addregisterdata(){
  this.http.addgetdata().subscribe(data=>{
   this.onedata = data;
   console.log("onedata",this.onedata,data);
  })
}
  
   deletedata(data){
    console.log(data);
     this.http.deletedata(data).subscribe(data=>{
       console.log(data);
       this.getstudentdata();
    });
  }
  updatedata(data){
    this.router.navigate(['/add']);
    console.log(data);
    this.http.updatedata(data.id).subscribe(data=>{
      this.getstudentdata();
     
    })
  }
  
 

 
  
}

