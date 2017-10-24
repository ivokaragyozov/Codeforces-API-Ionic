export class UserModel {
	handle: string;
	email: string;
	firstName: string;
	lastName: string;
	country: string;
	city: string;
	organization: string;
	contribution: number;
	rank: string;
	rating: number;
	maxRank: string;
	maxRating: number;
	friendOfCount: number;
	avatar: string;
	color: string;
	maxColor: string;

	static GetColorByRank(rank: string): string {
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
}