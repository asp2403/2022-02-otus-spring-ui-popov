import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IndexComponent } from './index/index.component';
import { BookDetailsComponent } from './book-details/book-details.component';
import { BookEditComponent } from './book-edit/book-edit.component';
import { LoginComponent } from './login/login.component';

const routes: Routes = [
  { path: 'index', component: IndexComponent },
  { path: 'book-details/:id', component: BookDetailsComponent },
  { path: 'book-edit/:id', component: BookEditComponent },
  { path: 'add-book', component: BookEditComponent },
  { path: 'login', component: LoginComponent },
  { path: '', redirectTo: '/index', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
