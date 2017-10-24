import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

import { UserModel } from '../models/user'
import { BlogpostModel } from '../models/blogpost'

@Injectable()
export class BlogsService {
	constructor(private http: Http) {

	}

	HandleError(err: any): Promise<any> {
		console.log(err);
		return Promise.reject(err);
	} 

	GetBlogpostsByUser(handle: string): Promise<BlogpostModel[]> {
		let requestUrl = 'http://codeforces.com/api/user.blogEntries?handle=' + handle;

		return this.http.get(requestUrl)
			.toPromise()
			.then(res => {
				let response = JSON.parse(res["_body"]).result;
				let blogposts: BlogpostModel[] = [

				];

				for(let blog of response) {
					blogposts.push({
						id: blog.id,
						creationTime: blog.creationTimeSeconds * 1000,
						authorHandle: blog.authorHandle,
						title: blog.title,
						tags: blog.tags,
						rating: blog.rating
					} as BlogpostModel);
				}

				return blogposts;
			})
			.catch(err => this.HandleError(err));
	}

	GetBlogpostById(id: number): Promise<BlogpostModel> {
		let requestUrl = 'http://codeforces.com/api/blogEntry.view?blogEntryId=' + id;

		return this.http.get(requestUrl)
			.toPromise()
			.then(res => {
				let response = JSON.parse(res['_body']).result;
				let blog: BlogpostModel = {
					id: response.id,
					creationTime: response.creationTimeSeconds * 1000,
					authorHandle: response.authorHandle,
					title: response.title,
					content: response.content,
					tags: response.tags,
					rating: response.rating
				}

				return blog;
			})
			.catch(err => this.HandleError(err));
	}
}