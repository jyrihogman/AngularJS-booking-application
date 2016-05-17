export class HomeController {
	scope: any;
	httpGet: ng.IHttpService;
	httpPost: ng.IHttpService;
	location: ng.ILocationService;
	messages: any[];
	reservations: any;
	Time: string;
	Date: string;
	
	static $inject = ['$http', '$scope' ];
	constructor ($http, $scope) {

		this.httpGet = $http;
		this.httpPost = $http;
		this.messages = [ 
			{ time: "16:00", day: "2016-05-17" },
			{ time: "13:00", day: "2016-05-17" },
			{ time: "15:00", day: "2016-05-20" }	
		];

		this.httpGet.get('http://localhost:56368/api/reservation').success((data) => this.reservations = data)
															  						   .error((data) => alert("erro"));
	}
	
	Submit() {
		if (this.Time) {
			let reserved = {
				"Time": this.Time,
				"Date": this.Date			
				}
			this.httpPost.post('http://localhost:56368/api/reserved', reserved).success((data) => alert("Product added succesfully"))
																			   .error((data) => alert("erro"));
			}
	}
}

angular.module('app').controller('HomeController', HomeController);        
                      
