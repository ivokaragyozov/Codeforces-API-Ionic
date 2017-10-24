import { Component } from '@angular/core';
import {NavController, NavParams} from 'ionic-angular';

import { UserModel } from '../../app/models/user';

@Component({
	selector: 'page-user-details',
	templateUrl: './user-details.html',
	styles: [
		'./user-details.scss'
	]
})
export class UserDetailsPage {
	user: UserModel;

	constructor(public navCtrl: NavController, public navParams: NavParams) {
		this.user = navParams.get('user') as UserModel;
	}
}