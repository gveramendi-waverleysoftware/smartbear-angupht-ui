import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-todo-modal',
  templateUrl: './todo-modal.component.html',
  styleUrls: ['./todo-modal.component.css'],
})
export class TodoModalComponent implements OnInit {
  @Input() user: any;
  usersToDoData: any;
  toDo: any;
  userTask:any
  constructor() {}

  ngOnInit(): void {}

  addTask(userId: any) {
    const d = [];
    if (this.usersToDoData) {
      this.usersToDoData
        .filter((v: any) => v.user === userId)[0]
        ?.tasks.push(this.toDo);
    } else {
      d.push({ user: userId, tasks: [this.toDo] });
      this.usersToDoData = d;
    }

    this.userTask = this.usersToDoData[0].tasks

    this.toDo = '';
  }
  deleteTask(task:any){
  const indexTask = this.userTask?.indexOf(task)
  this.userTask?.splice(indexTask,1)
  }
}
