export class HomeController {
	reservations: any;
	
	static $inject = ['$http'];
	constructor ($http) {	
		$http.get('http://localhost:56368/api/reservation').success((data) => this.reservations = data)
															  						   .error((data) => alert("erro"));
	}
}

angular.module('app').controller('HomeController', HomeController);        
                      
