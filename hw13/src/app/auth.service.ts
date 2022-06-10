import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ANONYMOUS_USER, User, UserDetails } from './domain/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  login(user: User): Observable<UserDetails> {
    return this.http.post<UserDetails>('/auth/login', user);
  }

  logout(): Observable<void> {
    return this.http.post<void>('/auth/logout', null);
  }

  userDetails: UserDetails = ANONYMOUS_USER;

  hasRole(roleName: string): boolean {
    return this.userDetails.roles.some(role => role.authority == 'ROLE_' + roleName);
  }

  hasAnyRole(roleNames: string[]): boolean {
    return this.userDetails.roles.some(role => roleNames.indexOf(role.authority.substring(5)) > -1);
  }

  getAuthToken(): string | null {
    return this.userDetails.token;
  }

}
