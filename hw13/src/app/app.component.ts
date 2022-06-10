import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { AuthService } from './auth.service';
import { ANONYMOUS_USER, UserDetails } from './domain/user';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'hw13';

  menuItems: MenuItem[] = [
    {
      label: 'Выход',
      icon: 'pi pi-sign-out',
      command: () => this.logout()
    }
  ];

  constructor(private authService: AuthService, private router: Router) { }

  get userDetails(): UserDetails {
    return this.authService.userDetails;
  }

  hasRole(roleName: string): boolean {
    return this.authService.hasRole(roleName);
  }

  logout(): void {
    this.authService.logout().subscribe(() => {
      this.authService.userDetails = ANONYMOUS_USER;
      this.router.navigate(["/"]);
    });

  }

}
