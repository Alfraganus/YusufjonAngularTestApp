import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  login(username: string, password: string): Observable<string> {
    if (username === 'user' && password === 'password') {
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
      const fakeToken = `${base64UrlHeader}.${base64UrlPayload}.fake-signature`;

      localStorage.setItem('token', fakeToken);
      return of(fakeToken);
    } else {
      return of(null);
    }
    console.log(localStorage.getItem('token'))
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
