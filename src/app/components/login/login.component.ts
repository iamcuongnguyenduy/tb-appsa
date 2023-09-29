import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/user';
import { UserValidators } from 'src/app/validators/user.validators';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export default class LoginComponent implements OnInit {
  form = new FormGroup({
    username: new FormControl('', [
      Validators.required,
      Validators.email,
      Validators.minLength(10),
    ]),
    password: new FormControl('', [Validators.required, UserValidators.cannotContainSpace])
  });

  users: User[]=[];
  constructor(private userService: UserService, private router: Router){}

  ngOnInit(): void {
   }

  get username(){
    return this.form.get('username')
  }
  get password(){
    return this.form.get('password')
  }

  login(){
    if(this.form.invalid){
      alert("Correct all fields before Login")
    }
    else{
    this.userService.getUsers()
      .subscribe(res => {
          // console.log(res);
          const userFound = res.find((user: User)=>{
              console.log(user.username===this.username?.value && user.password === this.password?.value);              
              return (user.username===this.username?.value && user.password === this.password?.value)
          });
          if(userFound){
            alert("Login successfully");
            this.form.reset;
            this.router.navigate(['userboard'])           
          }
          else
            alert("User is not found")

        }, err=>{
          alert("Something went wrong")
        })  
      }   
  }
}
