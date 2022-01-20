import { Component, OnInit } from '@angular/core';
import { AlertService } from 'src/app/services/alert.service';
import { AuthService } from 'src/app/services/auth.service';
import { TokenStorageService } from 'src/app/services/token-storage.service';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';
import { MatDialogRef, MatDialog } from '@angular/material/dialog';

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
  displayModal = false;
  dialogRef!: MatDialogRef<ConfirmDialogComponent>;
  constructor(private authService: AuthService, private tokenStorage: TokenStorageService, private alertService: AlertService,
    public dialog: MatDialog) {
    this.displayModal = false;
  }

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
      this.alertService.clear();
      this.dialogRef = this.dialog.open(ConfirmDialogComponent, {
        disableClose: false
      });
      this.dialogRef.componentInstance.confirmMessage = "Are you sure to change your password ?";
      this.dialogRef.afterClosed().subscribe(result => {
        if (result) {
          this.authService.changePassword(this.user.id, newPassword, confirmPassword, oldPassword).subscribe({
            next: data => {
              this.tokenStorage.saveToken(data.access);
              this.tokenStorage.saveUser(data);
              this.isPasswordMatch = false;
              this.isSuccess = true;
              this.alertService.success('Password changed successfully', { keepAfterRouteChange: true });
              window.sessionStorage.clear();
              window.location.replace('/login');
            },
            error: err => {
              this.errorMessage = err.error;
              this.isPasswordMatch = true;

            }
          })
        }
      });
    }
  }
}