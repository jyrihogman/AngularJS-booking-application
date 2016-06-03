import { IReservationContainer, IReservation } from 'app/features/home/IReservationContainer';

export class BookingController {
    matchPattern: RegExp;
	emailPattern: RegExp;
	http: ng.IHttpService;
	selected: IReservationContainer;
	selectedReservation: IReservation;
	momentDate: string;
	errorDate: string;
	selectedDay: moment.Moment;
    
    static $inject = ['$http'];
	constructor ( $http ) {
		this.http = $http;
		this.matchPattern = new RegExp('^[^\\d &\/\\#,+()$~%.:;_*?<>{} ]+[^\\d &\/\\#,+()$~%.:;_*?<>{} ]$');
		this.emailPattern = new RegExp('[^\d &\/\\#,+()$~%:;_*?<>{} .0-9]$');
	}

	submit () {
		if (this.selectedReservation) {
				this.selectedReservation.reserved = true;
				this.http.put('/api/reservations/' + this.selectedReservation.id, this.selectedReservation)
						.then((reservation) => alert('Reservation added succesfully'))

						.catch((reservation) => {
							this.selectedReservation.reserved = false;
							alert('Error')
						});
			}
	    }

	isAvailable() {
		if (this.selected)
		{
			if (this.selected.reservations.filter(available => available.reserved === false).length > 0)
				return this.selected.reservations.filter(available => available.reserved === false);
		}
	}

	dateToMoment() {
		if (!this.selected || this.selected.reservations.filter(available => available.reserved === false).length == 0)
			return this.errorDate = 'Nothing available for this day.';

		return this.momentDate = 'Reservations available for ' + moment(this.selected.date).format('dddd, MMMM Do YYYY');
	}
}

angular.module('app')
    .directive('bookingform', () => {
    return {
            restrict: 'E',
            templateUrl: 'features/home/bookingform/bookingform.html',
            controller: BookingController,
            controllerAs: '$book',
			bindToController: true,
			scope: { selected: '=' }
    }
});