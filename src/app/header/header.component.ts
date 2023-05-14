// header.component.ts
import { Component } from '@angular/core';
import {AuthService} from "../auth.service";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
})

export class HeaderComponent {
  constructor(public authService: AuthService) { }
  logout(): void {
    this.authService.logout();
  }

}
