import { Component, OnInit } from '@angular/core';
import { Router} from '@angular/router';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { MyappService } from '../services/myapp.service';
@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css']
})
export class AddComponent implements OnInit {
  addForm: FormGroup;
  submitted = false;
  onedata: Object;
  constructor(private router:Router,private http:MyappService,private formBuilder: FormBuilder) {
   }

   ngOnInit() {
    this.addForm = this.formBuilder.group({
      username: [null, [Validators.required, Validators.min(1)]],
        lastname: [null, [Validators.required, Validators.min(1)]],
        mobilenumber:[null, [Validators.required, Validators.min(10)]],
        email: [null, [Validators.required, Validators.email,Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')]]
    });
    
  }
  onSubmit() {
    
    console.log("StudentData", this.addForm.value);
    this.submitted = true;
    let obj = {
      username:this.addForm.value.username,
      lastname:this.addForm.value.lastname,   
      mobilenumber:this.addForm.value.mobilenumber,         
      email: this.addForm.value.email,
      
    }
    this.http.adform(obj).subscribe(data =>{
    console.log("response coming",data);
    
    if(data['msg']==' data saved successfully'){
       alert("registered successfully!");
      this.router.navigate(['/dashboard']);
    }
    else{
       alert(data['msg']);
      
    }
    
    this.addForm.reset();
    })
    
    
    
    if (this.addForm.invalid) {
        return;
    }

}



}
 

  
