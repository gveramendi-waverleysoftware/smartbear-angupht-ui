import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { AlertService } from 'src/app/services/alert.service';
import { UserService } from 'src/app/services/user.service';
import { first } from 'rxjs/operators';

@Component({
  selector: 'register',
  templateUrl: './register.component.html'
})
export class RegisterComponent implements OnInit {

  registerForm: FormGroup = this.fb.group({
    first_name: ['', [Validators.required]],
    last_name: ['', [Validators.required]],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(8)]],
    password1: ['', [Validators.required, Validators.minLength(8)]]
  });

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private alertService: AlertService,
    public dialogRef: MatDialogRef<RegisterComponent>) { }

  ngOnInit(): void {

  }
  get first_name(): any {
    return this.registerForm.get('first_name');
  }
  get last_name(): any {
    return this.registerForm.get('last_name');
  }
  get email(): any {
    return this.registerForm.get('email');
  }
  get password(): any {
    return this.registerForm.get('password');
  }
  get password1(): any {
    return this.registerForm.get('password1');
  }

  registerFormSubmit(): void {
    const formData = this.registerForm.value;
    if (this.registerForm.invalid || (formData.password != formData.password1)) {
      return;
    }
    
    delete formData.password1;
    this.alertService.clear();
    
    this.registerUser(formData); 
  }
  registerUser(data: any): void {
    console.log(JSON.stringify(data));
    this.userService.register(data)
      .pipe(first())
      .subscribe({
        next: () => {
          this.alertService.success('User registered successfully', { keepAfterRouteChange: true });
          this.closeModal();
        },
        error: error => {
          console.log("error:",error);
          this.alertService.error(error.message);
        }
      });
  }
  closeModal() {
    this.dialogRef.close();
  }
}
