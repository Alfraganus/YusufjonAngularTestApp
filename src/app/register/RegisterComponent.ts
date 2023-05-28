// register.component.ts
import { Component } from '@angular/core';
import {AuthService} from "../auth.service";
import {Role, User} from "../User";
import {Router} from "@angular/router";

@Component({
  selector: 'app-register',
  templateUrl: 'RegisterComponent.html',
  // styleUrls: ['./register.component.css'],
})
export class RegisterComponent {
  user: User;
  roles = Object.values(Role); // To populate roles dropdown

  constructor(private authService: AuthService,private router: Router) {
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
        console.log('Registration successful', user);
        const registrationsString = localStorage.getItem('registrations');
        let registrations = [];
        if (registrationsString) {
          registrations = JSON.parse(registrationsString);
        }
        registrations.push(user);
        localStorage.setItem('registrations', JSON.stringify(registrations));
        this.router.navigate(['/login']);
      },
      (error) => {
        // Handle error.
        console.log('Registration failed', error);
      }
    );
  }
}
