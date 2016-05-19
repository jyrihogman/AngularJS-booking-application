export class HomeController {
	scope: any;
	httpGet: ng.IHttpService;
	httpPost: ng.IHttpService;
	location: ng.ILocationService;
	messages: any[];
	reservations: any;
	Time: string;
	Date: string;
	matchPattern: RegExp;
	
	static $inject = ['$http'];
	constructor ( $http ) {
		this.httpGet = $http;
		this.httpPost = $http;
		this.messages = [ 
			{ time: "16:00", day: "2016-05-17" },
			{ time: "13:00", day: "2016-05-17" },
			{ time: "15:00", day: "2016-05-20" }	
		];
		this.matchPattern = new RegExp("^[a-z]");

		this.httpGet.get('http://localhost:56368/api/reservation').success((data) => this.reservations = data)
															  						   .error((data) => alert("erro"));
	}
	
	Submit() {
		if (this.Date) {
			let reserved = {
				"Time": this.Time,
				"Date": this.Date			
				}
			this.httpPost.post('http://localhost:56368/api/reserved', reserved).success((data) => alert("Reservation added succesfully"))
																			   .error((data) => alert("erro"));
			}
	}
}

angular.module('app').controller('HomeController', HomeController);        
                      
