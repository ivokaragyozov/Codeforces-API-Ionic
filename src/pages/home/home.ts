import { Component } from '@angular/core';
import { NavController, AlertController } from 'ionic-angular';

import { UsersService } from '../../app/services/users';

import { UserDetailsPage } from '../user-details/user-details';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  constructor(public navCtrl: NavController, private alertCtrl: AlertController, private usersService: UsersService) {

  }

  searchedHandle: string;

  SearchUser(): void {
    this.usersService.GetUserByHandle(this.searchedHandle)
      .then(user => {
        this.navCtrl.push(UserDetailsPage, {
          user: user
        });

        this.searchedHandle = "";
      })
      .catch(err => {
        let alert = this.alertCtrl.create({
          title: "User not found",
          subTitle: 'User with that handle was not found!',
          buttons: ['OK']
        });

        alert.present();
        this.searchedHandle = "";
      });
  }
}
