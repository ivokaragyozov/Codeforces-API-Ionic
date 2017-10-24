import { Injectable } from '@angular/core'
import { Http } from '@angular/http'

import { UserModel } from '../models/user'

import 'rxjs/add/operator/toPromise';

@Injectable()
export class UsersService {
	constructor(private http: Http) {

	}

	HandleError(err: any): Promise<any> {
		console.log(err);
		return Promise.reject(err);
	} 

	GetColorByRank(rank: string): string {
		if(rank == "newbie") {
			return "gray";
		}
		else if(rank == "pupil") {
			return "green";
		}
		else if(rank == "specialist") {
			return "cyan";
		}
		else if(rank == "expert") {
			return "blue";
		}
		else if(rank == "candidate master") {
			return "violet";
		}
		else if(rank == "master" || rank == "international master") {
			return "orange";
		}
		else {
			return "red";
		}
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
					color: this.GetColorByRank(response.rank),
					maxColor: this.GetColorByRank(response.maxRank)
				}

				return user;
			})
			.catch(err => this.HandleError(err));
	} 
}