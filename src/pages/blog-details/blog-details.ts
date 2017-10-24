import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { BlogpostModel } from '../../app/models/blogpost';

@Component({
	selector: 'blog-details',
	templateUrl: './blog-details.html',
	styles: [
		'./blog-details.scss'
	]
})
export class BlogDetailsPage {
	blog: BlogpostModel;

	constructor(public navCtrl: NavController, public navParams: NavParams) {
		this.blog = navParams.get('blog');
	}
}