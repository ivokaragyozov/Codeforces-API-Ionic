import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { HttpModule } from '@angular/http';

import { AppController } from './components/app/app';

import { UsersService } from './services/users';
import { BlogsService } from './services/blogs'

import { HomePage } from '../pages/home/home';
import { UserDetailsPage } from '../pages/user-details/user-details';
import { UserBlogpostsPage } from '../pages/user-blogposts/user-blogposts';
import { BlogDetailsPage } from '../pages/blog-details/blog-details';

@NgModule({
  declarations: [
    AppController,
    HomePage,
    UserDetailsPage,
    UserBlogpostsPage,
    BlogDetailsPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(AppController),
    HttpModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    AppController,
    HomePage,
    UserDetailsPage, 
    UserBlogpostsPage,
    BlogDetailsPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    UsersService,
    BlogsService
  ]
})
export class AppModule {}
