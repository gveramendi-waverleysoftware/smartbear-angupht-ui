import { Component } from '@angular/core';
import { AuthService } from './services/auth.service';
import { TokenStorageService } from './services/token-storage.service';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { RegisterComponent } from './components/register/register.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  isLoggedIn = false;
  title = 'smartbear-anguphy-ui';
  user = '';
  constructor(
    private tokenStorageService: TokenStorageService, 
    private authService: AuthService,
    public matDialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.isLoggedIn = !!this.tokenStorageService.getToken();

    if (this.isLoggedIn) {
      this.authService.currentUSer().subscribe({
        next: data => {
          this.user = data.email;
          console.log(data);
        },
        error: err => {
          console.log(err);
        }
      })
    }
  }

  logout(): void {
    this.tokenStorageService.signOut();
    window.location.reload();
  }

  openModal() {
    const dialogConfig = new MatDialogConfig();
    // The user can't close the dialog by clicking outside its body
    dialogConfig.disableClose = true;
    dialogConfig.id = "modal-component";
    dialogConfig.height = "400px";
    dialogConfig.width = "600px";
    // https://material.angular.io/components/dialog/overview
    const modalDialog = this.matDialog.open(RegisterComponent, dialogConfig);
  }
}
