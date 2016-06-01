export class HomeController {
	reservations = [];
	
	static $inject = ['$http'];
	constructor ($http) {
		$http.get('/api/reservations/status/false').success((data) => this.reservations = data)
																		 .error((data) => alert("erro"));
	}
}

angular.module('app').controller('HomeController', HomeController);        
                      
