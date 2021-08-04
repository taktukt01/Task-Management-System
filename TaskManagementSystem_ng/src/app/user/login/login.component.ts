import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(
    private userService: UserService,
    private router: Router

  ) { }
  ngOnInit(): void {
  }

  user: any = "default";

  

  // when user clicks 'Login', then we want to check if user exists, and grab a token.
  login(loginForm: NgForm){
    //call to service -- extract 
    //ok first grab token 
    // THEN login
    const grabToken = this.userService.getToken(loginForm.form.value.email, loginForm.form.value.password).subscribe((data: any) =>
      localStorage.setItem("token", data["access_token"]),
      error => console.log(error),
      () => { // execute this function only after token is retrieved.
        const loginObserver = this.userService.loginUser(loginForm.form.value.email, loginForm.form.value.password).subscribe
          ((data: any) => {
            if (data.Email) { // if user exists.
              loginObserver.unsubscribe();
              grabToken.unsubscribe();
              this.router.navigateByUrl("/dashboard");
            } else {
              alert("invalid credintals")
            }

          });
      }
    );
     
}
  //   if(this.user){
  //     console.log(this.user)
  //     this.router.navigateByUrl("/dashboard")
  //   }else{
  //     alert("login failed")
  //   }
  // }


}