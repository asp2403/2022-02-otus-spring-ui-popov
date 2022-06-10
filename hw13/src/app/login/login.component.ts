import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Location } from '@angular/common';
import { User } from '../domain/user';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm = new FormGroup({
    username: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required)
  });

  get usernameControl() {
    return this.loginForm.controls['username'];
  }

  get passwordControl() {
    return this.loginForm.controls['password'];
  }

  constructor(private authService: AuthService, private location: Location) { }

  ngOnInit(): void {
  }

  goBack(): void {
    this.location.back();
  }

  errorMsg: string = '';

  onSubmit(): void {
    if (this.loginForm.valid) {
      let user: User = {
        username: this.usernameControl.value,
        password: this.passwordControl.value
      }
      this.errorMsg = '';
      this.authService.login(user).subscribe({
        next: ud => {
          this.authService.userDetails = ud;
          this.goBack();
        },
        error: error => {
          if (error.status = 401) {
            this.errorMsg = 'Неправильное имя пользователя или пароль!'
          } else {
            console.error(error);
          }
        }
      });

    } else {
      Object.keys(this.loginForm.controls).forEach(key => {
        this.loginForm.controls[key].markAsDirty();
      });
    }
  }
}




