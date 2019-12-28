import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { MyappService } from '../services/myapp.service';
import { Router} from '@angular/router';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  submitted = false;
  onedata:any;
  constructor(private formBuilder: FormBuilder,private httpservice:MyappService,private router:Router) { }

  ngOnInit() {
      this.registerForm = this.formBuilder.group({
        username: ['', Validators.required],
          lastname: ['', Validators.required],
          middlename:['',Validators.required],
          email: ['', [Validators.required, Validators.email,Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')]],
          password: ['', [Validators.required, Validators.minLength(6)]],
          confirm_password:['',[Validators.required, Validators.minLength(6)]]
      });
        }
        onPasswordChange() {
          if (this.confirm_password.value == this.password.value) {
            this.confirm_password.setErrors(null);
          } else {
            this.confirm_password.setErrors({ mismatch: true });
          }
        }
        
        get password(): AbstractControl {
          return this.registerForm.controls['password'];
        }
        
        get confirm_password(): AbstractControl {
          return this.registerForm.controls['confirm_password'];
        }

        get f() { return this.registerForm.controls; }
        onSubmit() {
          var $this = this;
          console.log("StudentData", this.registerForm.value);
          this.submitted = true;
          let obj = {
            username:this.registerForm.value.username,
            lastname:this.registerForm.value.lastname,   
            middlename:this.registerForm.value.middlename,
            // mobilenumber:this.registerForm.value.mobilenumber,         
            email: this.registerForm.value.email,
            password: this.registerForm.value.password,
            confirm_password: this.registerForm.value.confirm_password
          }
          this.httpservice.postform(obj).subscribe(data =>{
          console.log("response coming",data);
          
          if(data['msg']=='data saved successfully'){
             alert("registered successfully! please login to continue");
            $this.router.navigate(['/login']);
          }
          else{
             alert(data['msg']);
            
          }
          this.registerForm.reset();
          })
          
          if (this.registerForm.invalid) {
              return;
          }
 
      }
      
    }
  

