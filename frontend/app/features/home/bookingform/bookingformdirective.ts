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
	a: string;
    
    static $inject = ['$http'];
	constructor ( $http ) {

		this.http = $http;
		// this.matchPattern = new RegExp('^[^\\d &\/\\#,+()$~%.:;_*?<>{} ]+[^\\d &\/\\#,+()$~%.:;_*?<>{} ]$', '') 
	}
	submit () {
		this.a = this.firstname.replace(/[&\/\\#,+()$~%.:;_^*?<>{} ]/g, '');
		if (this.Date) {
			let reservation = {
				"ID": "14",
				"TIME": this.Time,
				"EMAIL": this.Email,
				"DATE": this.Date,
				"FIRSTNAME": this.a,
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