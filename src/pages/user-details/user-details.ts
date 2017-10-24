import { Component } from '@angular/core';
import { NavController, NavParams, AlertController } from 'ionic-angular';

import { BlogsService } from '../../app/services/blogs';

import { UserBlogpostsPage } from '../user-blogposts/user-blogposts';

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

	constructor(public navCtrl: NavController, public navParams: NavParams, public alertCtrl: AlertController, private blogsService: BlogsService) {
		this.user = navParams.get('user') as UserModel;
	}

	GoToBlogposts(): void {
		this.blogsService.GetBlogpostsByUser(this.user.handle)
			.then(blogposts => {
				this.navCtrl.push(UserBlogpostsPage, {
					blogposts: blogposts
				})
			})
			.catch(err => {
				let alert = this.alertCtrl.create({
		          title: "Failed to open blogposts",
		          buttons: ['OK']
		        });

		        alert.present();
			});
	}
}