import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { first } from 'rxjs/operators';
import { ActivatedRoute, Router } from '@angular/router';
import { TodoModalComponent } from '../todo-modal/todo-modal.component';
@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css'],
})
export class UserListComponent implements OnInit {
  users: any;
  displayModal: Boolean;
  userTodo: any;
  constructor(private userService: UserService) {
    this.displayModal = false;
  }

  ngOnInit(): void {
    this.listUsers();
  }

  listUsers(): void {
    this.userService.listAll().subscribe((users) => {
      this.users = users.users;
      console.log('users', users);
    });
  }
  deleteUser(id: string, firstName: string, lastName: string) {
    if (
      confirm('Are you sure to delete a user ' + firstName + ' ' + lastName)
    ) {
      this.userService
        .delete(id)
        .pipe(first())
        .subscribe(() => this.listUsers());
    }
  }
  openToDoModal(userId: any) {
    const userModal: any = [];
    if (this.userTodo?.includes(userId)) {
      userModal.pop();
      console.log(userModal);
    } else {
      userModal?.push(userId);
    }
    this.userTodo = userModal;
    this.displayModal = !this.displayModal;
  }
}
