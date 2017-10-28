import { Component, ViewChild } from '@angular/core';
import { NavController, NavParams, AlertController } from 'ionic-angular';
import { Chart } from 'chart.js';

import { UsersService } from '../../app/services/users';

@Component({
	selector: 'user-rating-graph',
	templateUrl: './user-rating-graph.html',
	styles: [
		'./user-rating-graph.scss'
	]
})
export class UserRatingGraphPage {
	@ViewChild('graph') graphCanvas;

	handle: string;
	graph: any;

	constructor(public navCtrl: NavController, public navParams: NavParams, public alertCtrl: AlertController, private usersService : UsersService) {
		this.handle = navParams.get('handle');
	}

	ionViewDidLoad() {
		this.graph = this.GetGraph();
	}

	GetGraph() {
		this.usersService.GetRatingHistoryByHandle(this.handle)
			.then(res => {
				let ratingHistory: [number] = [], times: [string] = [];
				for(let change of res) {
					ratingHistory.push(change.newRating);
					let date = new Date(change.time * 1000);
					times.push(date.getDate().toString() + '-' + date.getMonth().toString() + '-'  + date.getFullYear().toString());
				}

				let data = {
					labels: times,
					datasets: [
						{	
							label: this.handle,
							fill: false,
				        	lineTension: 0.1,
				         	backgroundColor: "rgba(75,192,192,0.4)",
				       	 	borderColor: "rgba(75,192,192,1)",
				       	  	borderCapStyle: 'butt',
				       	  	borderDash: [],
				         	borderDashOffset: 0.0,
				         	borderJoinStyle: 'miter',
				         	pointBorderColor: "rgba(75,192,192,1)",
				         	pointBackgroundColor: "#fff",
				         	pointBorderWidth: 1,
				         	pointHoverRadius: 5,
				         	pointHoverBackgroundColor: "rgba(75,192,192,1)",
				         	pointHoverBorderColor: "rgba(220,220,220,1)",
				         	pointHoverBorderWidth: 2,
				         	pointRadius: 4,
				         	pointHitRadius: 10,
				         	data: ratingHistory,
				         	spanGaps: false
						}
					]
				}

				return new Chart(this.graphCanvas.nativeElement, {
					type: "line",
					data: data
		});
			})
			.catch(err => {
				let alert = this.alertCtrl.create({
		          title: "Failed to get rating history",
		          buttons: ['OK']
		        });

		        alert.present();
			})
	}
}