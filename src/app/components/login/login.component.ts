import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { TokenStorageService } from 'src/app/services/token-storage.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  form: any = {
    username: null,
    password: null
  };
  isLoggedIn = false;
  isLoginFailed = false;
  errorMessage = '';
  roles: string[] = [];

  constructor(private authService:AuthService, private tokenStorage: TokenStorageService) { }

  ngOnInit(): void {
    if(this.tokenStorage.getToken()){
      this.isLoggedIn = true;
    }
  }
  onSubmit():void{
    const {username,password} = this.form;
    this.authService.login(username, password).subscribe({
      next:data => {
        this.tokenStorage.saveToken(data.access);
        this.tokenStorage.saveUser(data);
        this.isLoginFailed = false;
        this.isLoggedIn=true;
        window.location.replace('users');
      },
      error:err=>{
        this.errorMessage = err.error.message;
        this.isLoginFailed=true;
        
      }
    })
  }
}
