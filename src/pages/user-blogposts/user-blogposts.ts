import { Component } from '@angular/core';
import { NavController, NavParams, AlertController } from 'ionic-angular';

import { BlogsService } from '../../app/services/blogs';

import { BlogpostModel } from '../../app/models/blogpost';

import { BlogDetailsPage } from '../blog-details/blog-details';

@Component({
	selector: 'user-blogposts',
	templateUrl: './user-blogposts.html',
	styles: [
		'./user-blogposts.scss'
	]
})
export class UserBlogpostsPage {
	blogs: BlogpostModel[] = [

	];

	constructor(public navCtrl: NavController, public navParams: NavParams, public alertCtrl: AlertController, private blogsService: BlogsService) {
		this.blogs = navParams.get('blogposts');
	}

	GetBlogDetails(id: number): void {
		this.blogsService.GetBlogpostById(id)
			.then(blog => {
				this.navCtrl.push(BlogDetailsPage, {
					blog: blog
				});
			})
			.catch(err => {
				let alert = this.alertCtrl.create({
		          title: "Blogpost failed to open!",
		          buttons: ['OK']
		        });

		        alert.present();
			})
	}
}