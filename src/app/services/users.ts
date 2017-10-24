import { Injectable } from '@angular/core'
import { Http } from '@angular/http'

import { UserModel } from '../models/user'
import { BlogpostModel } from '../models/blogpost'

import 'rxjs/add/operator/toPromise';

@Injectable()
export class UsersService {
	constructor(private http: Http) {

	}

	HandleError(err: any): Promise<any> {
		console.log(err);
		return Promise.reject(err);
	} 

	GetUserByHandle(handle: string): Promise<UserModel> {
		let requestUrl = 'http://codeforces.com/api/user.info?handles=' + handle;

		return this.http.get(requestUrl)
			.toPromise()
			.then(res => {
				let response = JSON.parse(res["_body"]).result[0];
				let user: UserModel = {
					handle: handle,
					email: response.email,
					firstName: response.firstName,
					lastName: response.lastName,
					country: response.country,
					city: response.city,
					organization: response.organization,
					contribution: response.contribution,
					rank: response.rank,
					rating: response.rating,
					maxRank: response.maxRank,
					maxRating: response.maxRating,
					friendOfCount: response.friendOfCount,
					avatar: response.avatar,
					color: UserModel.GetColorByRank(response.rank),
					maxColor: UserModel.GetColorByRank(response.maxRank)
				}

				return user;
			})
			.catch(err => this.HandleError(err));
	} 
}