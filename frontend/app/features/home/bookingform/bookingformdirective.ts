export class BookingController {
    messages: any[];
	reservations: any;
	Time: string;
	Id: any;
	Date: string;
	Email: string;
	firstname: string;
	lastname: string;
    matchPattern: RegExp;
	emailPattern: RegExp;
	http: ng.IHttpService;
    
    static $inject = ['$http'];
	constructor ( $http ) {

		this.http = $http;
		this.matchPattern = new RegExp('^[^\\d &\/\\#,+()$~%.:;_*?<>{} ]+[^\\d &\/\\#,+()$~%.:;_*?<>{} ]$');
		this.emailPattern = new RegExp('[^\d &\/\\#,+()$~%:;_*?<>{} .0-9]$');
	}
	submit () {
		if (this.Id && this.Email, this.firstname, this.lastname) {
			let reservation = {
				"ID": this.Id,
				"EMAIL": this.Email,
				"FIRSTNAME": this.firstname,
				"LASTNAME": this.lastname,
				"RESERVED": true
				};

				this.http.put('http://localhost:61520/api/reservations/' + reservation.ID, reservation).then((reservation) => alert("Reservation added succesfully"))
																									   .catch((reservation) => alert("erro"));
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