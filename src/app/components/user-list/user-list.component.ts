import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { first } from 'rxjs/operators';
import { ActivatedRoute, Router } from '@angular/router';
@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {
  users: any;

  constructor(
    private userService: UserService
  ) { }

  ngOnInit(): void {
    this.listUsers();
  }

  listUsers(): void {
    this.userService.listAll()
      .subscribe((users) => {
        this.users = users.users;
        console.log('users', users);
      });
  }
  deleteUser(id: string, firstName: string, lastName: string) {
    if(confirm("Are you sure to delete a user "+firstName + " " + lastName)) {
      this.userService.delete(id)
      .pipe(first())
      .subscribe(() => this.listUsers());
    }
    
  }
}
