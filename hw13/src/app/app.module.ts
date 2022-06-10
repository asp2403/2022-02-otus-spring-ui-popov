import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {ButtonModule} from 'primeng/button';
import { IndexComponent } from './index/index.component';
import { HttpClientModule } from '@angular/common/http';
import {TableModule} from 'primeng/table';
import { BookDetailsComponent } from './book-details/book-details.component';
import { BookEditComponent } from './book-edit/book-edit.component';
import { DropdownModule } from 'primeng/dropdown';
import { ReactiveFormsModule } from '@angular/forms';
import {InputTextModule} from 'primeng/inputtext';
import {DividerModule} from 'primeng/divider';
import {ConfirmDialogModule} from 'primeng/confirmdialog';
import {ConfirmationService} from 'primeng/api';
import { LoginComponent } from './login/login.component';
import {MenuModule} from 'primeng/menu';
import { httpInterceptorProviders } from './http-interceptors';
import { CommentEditComponent } from './comment-edit/comment-edit.component';
import {InputTextareaModule} from 'primeng/inputtextarea';

@NgModule({
  declarations: [
    AppComponent,
    IndexComponent,
    BookDetailsComponent,
    BookEditComponent,
    LoginComponent,
    CommentEditComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    ButtonModule,
    HttpClientModule,
    TableModule,
    DropdownModule,
    ReactiveFormsModule,
    InputTextModule,
    DividerModule,
    ConfirmDialogModule,
    MenuModule,
    InputTextareaModule
  ],
  providers: [ConfirmationService, httpInterceptorProviders],
  bootstrap: [AppComponent]
})
export class AppModule { }
