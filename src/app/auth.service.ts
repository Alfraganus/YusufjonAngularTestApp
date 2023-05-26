import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import {User} from "./User";
import { Router } from '@angular/router';
import jwt_decode from 'jwt-decode';
@Injectable({
  providedIn: 'root',
})
export class AuthService {

  private users: User[] = JSON.parse(localStorage.getItem('users') || '[]');
  constructor(private router: Router) {}
  register(user: User): Observable<User> {
    // Check if a user with the same Neptun Code already exists.
/*
    const existingUser = this.users.find(u => u.neptunCode === user.neptunCode);
    if (existingUser) {
      throw new Error('A user with this Neptun Code already exists.');
    }
*/

    // Add the new user and save the users array back to local storage.
    this.users.push(user);
    localStorage.setItem('users', JSON.stringify(this.users));

    return of(user);
  }


  login(username: string, password: string): Observable<string> {
    const users: User[] = JSON.parse(localStorage.getItem('users') || '[]');
    const user = users.find(u => u.name === username && u.password === password);

    if ((username === 'user' && password === 'password') || user) {
      const header = {
        alg: 'HS256',
        typ: 'JWT',
      };

      const payload = {
        username: username,
        exp: Math.floor(Date.now() / 1000) + 60 * 60, // Expires in 1 hour
      };

      const base64UrlHeader = btoa(JSON.stringify(header));
      const base64UrlPayload = btoa(JSON.stringify(payload));
      const fakeToken = `${base64UrlHeader}.${base64UrlPayload}`;
      localStorage.setItem('token', fakeToken);
      console.log(jwt_decode(fakeToken))
      return of(fakeToken);
    } else {
      return of(null);
    }
  }


  logout(): void {
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
  }
  isLoggedIn(): boolean {
    const token = localStorage.getItem('token');
    if (token) {
      const [, base64UrlPayload,] = token.split('.');
      const payload = JSON.parse(atob(base64UrlPayload));

      if (payload.exp && payload.exp > Math.floor(Date.now() / 1000)) {
        return true;
      }
    }
    return false;
  }
}
