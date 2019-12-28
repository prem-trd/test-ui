
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router} from '@angular/router';
import { MyappService } from '../services/myapp.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
 
  loginForm: FormGroup;
  submitted = false;

  passwordType: string ="password";
  passwordShown:boolean = false;
  constructor(private formBuilder: FormBuilder,private router:Router,private myservice:MyappService) { 
    
  }
  
  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email,Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')]],
      password: ['', [Validators.required, Validators.minLength(6)]]
      
  });
    
  }
  get f() { return this.loginForm.controls; }

  onSubmit() {
    console.log("value",this.loginForm.value);
    let obj={
      email:this.loginForm.value.email,
      password:this.loginForm.value.password
    }
    this.myservice.login(obj).subscribe(data=>{
      console.log("data from login service",data);
      localStorage.setItem("email",this.loginForm.value.email);
      if(data['message']=="login success"){
        this.router.navigate(['/dashboard']);
      }
      else{
        alert("provide valid email and password");
      }
    },err=>{
      console.log("err",err['err']);
    })

}
register(){
  this.router.navigate(['/register']);
}


  togglebutton(){
if(this.passwordShown){
   this.passwordShown = false;
   this.passwordType = 'password';
} else{
  this.passwordShown = false;
   this.passwordType = 'password';
}
  }
  check(){
    alert("Email and password succesfully saved");
  }
}






