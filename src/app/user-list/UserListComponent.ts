import {Component, OnInit} from "@angular/core";

@Component({
  selector: 'app-user-list',
  templateUrl: 'UserListComponent.html',
})

export class UserListComponent implements OnInit {
  registered_users: any[] = [];

  ngOnInit(): void {
    const users = localStorage.getItem('registrations');
    if (users) {
      this.registered_users = JSON.parse(users);
      for (let user of this.registered_users) {
        user.dateOfBirth = new Date(user.dateOfBirth);
      }
    }
    console.log(users)
  }

  protected readonly Date = Date;
}
