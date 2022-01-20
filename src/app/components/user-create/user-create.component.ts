import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { first } from 'rxjs/operators';
import { DatePipe } from '@angular/common'
import { AlertService } from 'src/app/services/alert.service';

@Component({
  selector: 'app-user-create',
  templateUrl: './user-create.component.html',
  styleUrls: ['./user-create.component.css']
})
export class UserCreateComponent implements OnInit {

  form: any = {
    first_name: null,
    last_name: null,
    email: null,
    password: null,
    birthday: null,
    address: null
  };
  id!: string;
  isAddMode!: boolean;
  loading = false;
  submitted = false;
  user: any;

  constructor(
    private userService: UserService,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    public datepipe: DatePipe,
    private alertService: AlertService
  ) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.isAddMode = !this.id;

    // password not required in edit mode
    const passwordValidators = [Validators.minLength(6)];
    if (this.isAddMode) {
      passwordValidators.push(Validators.required);
    }

    this.form = this.formBuilder.group({
      first_name: ['', Validators.required],
      last_name: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', passwordValidators],
      birthday: [this.datepipe.transform('01-01-1960', 'yyyy-MM-dd'), Validators.required],
      address: ['']
    });

    if (!this.isAddMode) {
      this.userService.getById(this.id)
        .pipe(first())
        .subscribe((user) => {
          this.user = user;
          this.form.patchValue(this.user);
          this.form.birthday = this.datepipe.transform(this.user.birthday.toString(), 'yyyy-MM-dd');

          console.log('USERs', this.user.birthday);
          console.log('USER1', this.form.birthday);
        });
    }
    

  }

  // convenience getter for easy access to form fields
  get f() { return this.form.controls; }


  onSubmit(): void {
    this.submitted = true;

    // reset alerts on submit
    this.alertService.clear();

    // stop here if form is invalid
    if (this.form.invalid) {
      return;
    }
    this.loading = true;

    if (this.isAddMode) {
      this.createUser();
    } else {
      this.updateUser();

    }
  }
  createUser(): void {
    this.userService.create(this.form.value)
      .pipe(first())
      .subscribe({
        next: () => {
          this.alertService.success('User added successfully', { keepAfterRouteChange: true });
          this.router.navigate(['../'], { relativeTo: this.route });
        },
        error: error => {
          this.alertService.error(error.message);
          this.loading = false;
        }
      });
  }

  updateUser(): void {
    this.userService.update(this.id, this.form.value)
      .pipe(first())
      .subscribe({
        next: () => {
          this.alertService.success('Update successful', { keepAfterRouteChange: true });
          this.router.navigate(['../'], { relativeTo: this.route });
        },
        error: error => {
          this.alertService.error(error.message);
          this.loading = false;
        }
      });
  }

}
