export class BookingController {
    messages: any[];
	reservations: any;
	Time: string;
	Date: string;
	Email: string;
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
		if (this.Time) {
			let reservation = {
				"ID": "3",
				"TIME": this.Time,
				"EMAIL": this.Email,
				"DATE": this.Date,
				"FIRSTNAME": this.firstname,
				"LASTNAME": this.lastname,
				"RESERVED": true
				};

				this.http.put('http://localhost:61520/api/reservations/' + reservation.ID, reservation).success((reservation) => alert("Reservation added succesfully"))
																						   .error((reservation) => alert("erro"));

			}
	    }
}

angular.module('app')
    .directive('bookingform', () => {
    return {
            restrict: 'E',
            templateUrl: 'features/home/bookingform/bookingform.html',
            controller: BookingController,
            controllerAs: '$book'
    }
});