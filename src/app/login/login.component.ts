import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { of } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  username: string;
  password: string;
  loginError: string;

  constructor(private authService: AuthService, private router: Router) {}

  login(): void {
    this.authService.login(this.username, this.password).subscribe(
      (token) => {
        if (token) {
          console.log('Logged in successfully');
          console.log(localStorage.getItem('token'));
          // Redirect to the InstructorsComponent
          this.router.navigate(['/']);
        } else {
          this.loginError = 'Invalid username or password';
        }
      },
      (error) => {
        this.loginError = 'Invalid username or password';
      }
    );
  }
}
