// src/app/auth-interceptor.service.ts
import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler } from '@angular/common/http';

@Injectable()
export class AuthInterceptorService implements HttpInterceptor {

  constructor() { }

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    const modifiedReq = req.clone({
      headers: req.headers.set('Authorization', 'Bearer ' + this.getToken())
    });

    return next.handle(modifiedReq);
  }

  private getToken(): string {
    // Replace this with your logic for getting the token
    return localStorage.getItem('users');
  }
}
