export class BookingController {
    messages: any[];
	reservations: any;
	Time: string;
	Id: string;
	Date: string;
	Email: string;
	firstname: string;
	lastname: string;
    matchPattern: RegExp;
	http: ng.IHttpService;
    
    static $inject = ['$http'];
	constructor ( $http ) {
		this.matchPattern = new RegExp('^[A-Za-z]+[- a-zA-Z]');
		this.http = $http;
	}
	submit () {
		if (this.Date) {
			let reservation = {
				"ID": "8",
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