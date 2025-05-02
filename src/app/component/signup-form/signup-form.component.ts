import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-signup-form',
  imports: [FormsModule,CommonModule,HttpClientModule,RouterOutlet,RouterLink],
  standalone: true,
  templateUrl: './signup-form.component.html',
  styleUrl: './signup-form.component.css'
})

export class SignupFormComponent {
  finalmsg:string = '';
  showmsg:boolean = false;
  messageWarning:string = '';
  showWarning:boolean = false;
  formSubmitted: boolean = false;
  showOutput: boolean = false;
  finalstatus: string = '';
  conpassword:string = ''
  userObj:any = {
    username : '',
    usermail : '',
    userpass : '',
    useraddr : '',
    userorders : ''
  }

  constructor(private http: HttpClient) {}

  validatePassword(password: string): boolean {
    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9]).{9,}$/;
    return regex.test(password);
  }

  validateMail(mail:string):boolean{
    const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return regex.test(mail);
  }

  authorize(event:any){
    event.preventDefault();
    this.formSubmitted = true;
    this.showWarning = false;
    this.showOutput = false;
    this.showmsg = false;
    this.finalmsg = '';
    this.messageWarning = '';
    this.finalstatus = '';
    if (!this.userObj.username || !this.userObj.usermail || !this.userObj.userpass || !this.conpassword || !this.userObj.useraddr) {
      this.messageWarning = "Some fields are missing!";
      this.showWarning = true;
      return;
    }
    
  
    if (this.userObj.userpass != this.conpassword) {
      this.messageWarning = "Passwords do not match!";
      this.showWarning = true;
      return;
    }
 
    if(!this.validatePassword(this.userObj.userpass)){
      this.messageWarning = "Invalid password";
      this.showWarning = true;
      return;
    }

    if(!this.validateMail(this.userObj.usermail)){
      this.messageWarning = "Enter a valid mail";
      this.showWarning = true;
      return;
    }
    
    this.http.post("http://localhost:3000/signup", this.userObj).subscribe({
      next: (res) => {
        this.finalmsg = "Sign up successful, please return to login page and login";
        this.showmsg = true;
      },
      error: (err) => {
        if (err.status === 400) {
          this.messageWarning = "Mail already exists, please check again";
        } else {
          this.messageWarning = "Something wrong happened, please try again later";
        }
        this.showWarning = true;
      }
    });
  }
}
