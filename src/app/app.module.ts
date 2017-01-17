import { NgModule } from '@angular/core';
import { IonicApp, IonicModule } from 'ionic-angular';
import { MyApp } from './app.component';
import { UsersService } from '../providers/users-service';
import { PostsService } from '../providers/posts-service';

import {
  TabsPage,
  LoginPage,
  ResetPasswordPage,
  PostAddPage,
  UserDetailsPage,
  RegisterPage,
  HomePage,
  AboutPage,
  ContactPage
} from '../pages/pages';

@NgModule({
  declarations: [
    MyApp,
    TabsPage,
    LoginPage,
    ResetPasswordPage,
    PostAddPage,
    UserDetailsPage,
    RegisterPage,
    HomePage,
    AboutPage,
    ContactPage
  ],
  imports: [
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    TabsPage,
    LoginPage,
    ResetPasswordPage,
    PostAddPage,
    UserDetailsPage,
    RegisterPage,
    HomePage,
    AboutPage,
    ContactPage
  ],
  providers: [UsersService,PostsService]
})
export class AppModule { }
