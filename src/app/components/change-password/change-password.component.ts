import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { TokenStorageService } from 'src/app/services/token-storage.service';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit {
  form: any = {
    newPassword: null,
    confirmPassword: null,
    oldPassword: null
  };
  isPasswordMatch = false;
  isSuccess = false;
  errorMessage = '';
  user: any;
  constructor(private authService: AuthService, private tokenStorage: TokenStorageService) { }

  ngOnInit(): void {
    this.authService.currentUSer().subscribe({
      next: data => {
        this.user = data;
        console.log(data);
      },
      error: err => {
        this.errorMessage = err.error.message;
        console.log(err);
      }
    })
  }

  onSubmit() {
    const { newPassword, confirmPassword, oldPassword } = this.form;
    this.isPasswordMatch = !(newPassword == confirmPassword);
    if (this.isPasswordMatch) {
      this.errorMessage = 'The new and confirm passwords are not the same';
    }
    else {
      this.authService.changePassword(this.user.id, newPassword, confirmPassword, oldPassword).subscribe({
        next: data => {
          this.tokenStorage.saveToken(data.access);
          this.tokenStorage.saveUser(data);
          this.isPasswordMatch = false;
          this.isSuccess = true;
        },
        error: err => {
          this.errorMessage = err.error.password;
          this.isPasswordMatch = true;

        }
      })
    }
  }
}