import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { UserService } from 'src/app/services/user.service';
import { Router } from '@angular/router';
import { UserValidators } from 'src/app/validators/user.validators';
import { User } from 'src/app/user';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export default class RegisterComponent {
  form: any;
  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private router: Router
    ){}

  ngOnInit(): void {
    this.form = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      username: ['', [
          Validators.required,
          Validators.email, 
          Validators.minLength(10), 
          UserValidators.shouldBeUnique
        ]
      ],
      password: ['', [
          Validators.required, 
          UserValidators.cannotContainSpace
        ]
      ],
      confirmPassword: ['', Validators.required],
      mobileNumber: ['', Validators.required],
      role: ['', Validators.required]
    }, {
      validator: UserValidators.passwordsShouldMatch
    });
  }
  
  userObject: User  = {
    id: 0,
    firstName: '',
    lastName: '',
    username: '',
    mobileNumber: 0,
    password: '',
    role: '',
  }
  signup(){    
    if(this.form.invalid){
      alert("Please correct all fields before Sign-up")
    }
    else{
    this.userObject.firstName = this.firstName.value;
    this.userObject.lastName = this.lastName.value;
    this.userObject.username = this.username.value;
    this.userObject.password = this.password.value;
    this.userObject.mobileNumber = this.mobileNumber.value;
    this.userObject.role = this.role.value;
   
    this.userService.postUser(this.userObject)
      .subscribe((res: any)=>{
        console.log(res); 
        alert("User created successfully")         
      }, (err: any) =>{
        alert("Add user get failed")
      })

      
      this.router.navigate(['/login']);
      this.form.reset();
      this.confirmPassword.reset()
      
     
    }
  }

  get firstName(){
    return this.form.get('firstName');
  }

  get lastName(){
    return this.form.get('lastName');
  }
    
  get username(){
    return this.form.get('username');
  }

  get password(){
    return this.form.get('password');
  }

  get confirmPassword(){
    return this.form.get('confirmPassword')
  }

  get mobileNumber(){
    return this.form.get('mobileNumber')
  }

  get role(){
    return this.form.get('role')
  }
}
