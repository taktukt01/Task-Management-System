import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/user.service';
import {User} from '../user';
@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {

  constructor(
    private userService:UserService,
    private router:Router
  ) { }

  user:User;
  ngOnInit(): void {
  }


  register(registerForm:NgForm){
    if(registerForm.form.status === "VALID"){

   this.user= {
      Email :  registerForm.form.value.email,
      password :  registerForm.form.value.password,
      confirmPassword : registerForm.form.value.confirmPassword,
    }
    this.userService.registerUser(this.user).subscribe();
    //generate a token , store in localStorage
    // localStorage.setItem("token" , )
    //log them in , pass token in header
    // this.userService.login()
      this.router.navigateByUrl("/")
    }else{ //unsuccessful register
      alert("failed to register")
    }
    //extract email, password
    // feed into user service -- register(email,password)
  }
}
