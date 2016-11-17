import {IReservationContainer} from './IReservationContainer';

export class ReservationService {
    reservationContainers: IReservationContainer[];
	reservationContainer: IReservationContainer;

    static $inject = ['$http'];
    constructor(private $http) {
		$http.get('/api/reservations').success((data) => this.reservationContainers = data)
			.error((data) => alert('Error connecting to server'));
    }

    getReservationContainer(date: moment.Moment): IReservationContainer {
		return !this.reservationContainers? null : this.reservationContainers.filter(container => container.date === date.format('YYYY-MM-DD'))[0];
	}

    getAvailability(date: moment.Moment): number {
        return !this.reservationContainers? null : this.reservationContainers.filter(container => container.date === date.format('YYYY-MM-DD')).length;
    }
}

angular.module('app').service('ReservationService', ReservationService);
