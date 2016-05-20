export class BookingController {
    messages: any[];
	reservations: any;
	Time: string;
	Date: string;
	firstname: string;
	lastname: string;
    matchPattern: RegExp;
	http: ng.IHttpService;
    
    static $inject = ['$http'];
	constructor ( $http ) {
		// this.messages = [ 
		// 	{ time: "16:00", day: "2016-05-17" },
		// 	{ time: "13:00", day: "2016-05-17" },
		// 	{ time: "15:00", day: "2016-05-20" }	
		// ];
		this.matchPattern = new RegExp('^[A-Z]?[- a-zA-Z]');
		this.http = $http;                                                                       
	}
	submit () {
		if (this.Date) {
			let reserved = {
				"Time": this.Time,
				"Date": this.Date,
				"Firstname": this.firstname,
				"Lastname": this.lastname
							
				};
			this.http.post('http://localhost:56368/api/reserved', reserved).success((data) => alert("Reservation added succesfully"))
																			   .error((data) => alert("erro"));
			}
	    }
}

angular.module('app')
    .directive('bookingform', () => {
    return {
            restrict: 'EA',
            templateUrl: 'features/home/bookingform/bookingform.html',
            controller: BookingController,
            controllerAs: '$book',
    }
});