import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { first } from 'rxjs/operators';
import { ActivatedRoute, Router } from '@angular/router';
import { TodoModalComponent } from '../todo-modal/todo-modal.component';
import { AlertService } from 'src/app/services/alert.service';
import { MatDialogRef, MatDialog  } from '@angular/material/dialog';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {
  users: any;
  displayModal: Boolean;
  userTodo: any;
  dialogRef!: MatDialogRef<ConfirmDialogComponent>;

  constructor(
    private userService: UserService,
    private alertService: AlertService,
    public dialog: MatDialog
  ) { 
    this.displayModal = false;
  }


  ngOnInit(): void {
    this.listUsers();
  }

  listUsers(): void {
    this.userService.listAll()
      .subscribe((users) => {
        this.users = users.results;
        console.log('users', this.users);
      });
  }
  deleteUser(id: string, firstName: string, lastName: string) {
    this.alertService.clear();
    this.dialogRef = this.dialog.open(ConfirmDialogComponent, {
      disableClose: false
    });
    this.dialogRef.componentInstance.confirmMessage = "Are you sure to delete a user "+firstName + " " + lastName +"?"

    this.dialogRef.afterClosed().subscribe(result => {
      if(result) {
        this.userService.delete(id)
        .pipe(first())
        .subscribe(() => this.listUsers());
        this.alertService.success('User deleted successfully', { keepAfterRouteChange: true });
      }
    });

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
