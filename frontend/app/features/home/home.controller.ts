import { IReservationContainer } from './IReservationContainer';


export class HomeController {
	selectedDay: moment.Moment;
	reservationContainers: IReservationContainer[];
	reservationContainer: IReservationContainer;


	static $inject = ['$http'];
	constructor($http) {
		$http.get('/api/reservations').success((data) => this.reservationContainers = data)
			.error((data) => alert("erro"));
	}

	getReservationContainer(date: moment.Moment) {
		return !this.reservationContainers? null : this.reservationContainers.filter(container => container.date === date.format('YYYY-MM-DD'))[0];
	}
}

angular.module('app').controller('HomeController', HomeController);

