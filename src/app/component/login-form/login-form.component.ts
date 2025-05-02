import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink, RouterOutlet,Router } from '@angular/router';
@Component({
  selector: 'app-login-form',
  imports: [FormsModule,RouterLink,RouterOutlet,CommonModule,HttpClientModule],
  templateUrl: './login-form.component.html',
  styleUrl: './login-form.component.css'
})
export class LoginFormComponent {
  userObj:any = {
    usermail : '',
    userpass : ''
  }
  constructor(private http: HttpClient,private router: Router) {}
  formSubmitted: boolean = false;
  displayError: boolean = false;
  errMsg: string = '';

  authorise(event:any){
    this.displayError = false;
    event.preventDefault();
    this.formSubmitted = true;
    if(this.userObj.usermail == '' || this.userObj.userpass == ''){
      console.warn("Some fields are missing!");
      return;
    }
    this.http.post("http://localhost:3000/users",this.userObj).subscribe({
      next: (res) => {
        
        console.log(res);
        sessionStorage.setItem("currUser",JSON.stringify(res));
        this.router.navigate(['/home']);
      },
      error: (err) => {
        if(err.status === 400){
          this.errMsg = "Mail or password wrong";
          this.displayError = true;
        }
        else{
          console.log(err);
        }
      }
    })
  }
}
