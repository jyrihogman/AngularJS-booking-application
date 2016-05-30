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
	http: ng.IHttpService;
	a: string;
	b: string;
    
    static $inject = ['$http'];
	constructor ( $http ) {

		this.http = $http;
		this.matchPattern = new RegExp('^[^\\d &\/\\#,+()$~%.:;_*?<>{} ]+[^\\d &\/\\#,+()$~%.:;_*?<>{} ]$', '');
	}
	submit () {
		this.a = this.firstname.replace(/[&\/\\#,+()$~%.:;_^*?<>{} ]/g, '');
		this.b = this.lastname.replace(/[&\/\\#,+()$~%.:;_^*?<>{} ]/g, '');
		if (this.Id) {
			let reservation = {
				"ID": this.Id,
				"EMAIL": this.Email,
				"FIRSTNAME": this.a,
				"LASTNAME": this.b,
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