// register.component.ts
import { Component } from '@angular/core';
import {AuthService} from "../auth.service";
import {Role, User} from "../User";

@Component({
  selector: 'app-register',
  templateUrl: 'RegisterComponent.html',
  // styleUrls: ['./register.component.css'],
})
export class RegisterComponent {
  user: User;
  roles = Object.values(Role); // To populate roles dropdown

  constructor(private authService: AuthService) {
    this.user = {
      dateOfBirth: new Date(),
      name: '',
      neptunCode: '',
      roles: [],
      password: '',
    };
  }

  register(): void {
    this.authService.register(this.user).subscribe(
      (user) => {
        // Registration successful.
        console.log('Registration successful', user);
      },
      (error) => {
        // Handle error.
        console.log('Registration failed', error);
      }
    );
  }
}
