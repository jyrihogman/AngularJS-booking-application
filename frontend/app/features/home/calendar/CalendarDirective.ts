import { ReservationService } from 'features/home/ReservationService';

export class CalendarController {
    weeks = [];
    day: moment.Moment;
    month: moment.Moment;
    selected: moment.Moment;
    
    static $inject = ['ReservationService'];
	constructor (private reservationService: ReservationService) {
        this.selected = this.removeTime(this.selected || moment());
        this.month = this.selected.clone();
        const start = this.selected.clone();
        start.date(-6); // 1
        this.removeTime(start.day(1)); // 0
        this.buildMonth(start, this.month);
    }

    dateAvailability(day): number {
        if (day.isSameOrAfter(moment(),'day') && this.reservationService.getAvailability(day) == 0)
            return 0
    }

    select(day) {
        if (day.date.isSameOrAfter(moment(),'day')) {
            this.selected = day.date;
        }
    }
    
    next() {
        const next = this.month.clone();
        this.removeTime(next.month(next.month() + 1).date(0).day(1)); // date 1, day 0
        this.month.month(this.month.month() + 1);
        this.buildMonth(next, this.month);
    }
    
    previous() {
        const previous = this.month.clone();
        this.removeTime(previous.month(previous.month() - 1).date(0).day(1)); // date 1, day 0
        this.month.month(this.month.month() - 1);
        this.buildMonth(previous, this.month);
    }
    
    removeTime(date: moment.Moment): moment.Moment {
        return date.hour(0).minute(0).second(0).millisecond(0);
    }
    
    buildMonth(start, month) {
        this.weeks = [];
        let done = false, date = start.clone(), monthIndex = date.month(), count = 0;
        while (!done) {
            this.weeks.push({ days: this.buildWeek(date.clone(), month) });
            date.add(1, 'w');
            done = count++ > 2 && monthIndex !== date.month();
            monthIndex = date.month();
        }
    }
    
    buildWeek(date, month) {
        const days = [];
        for (var i = 0; i < 7; i++) {
                days.push({
                name: date.format('dd').substring(0, 1),
                number: date.date(),
                isCurrentMonth: date.month() === month.month(),
                isToday: date.isSame(new Date(), 'day'),
                date: date,
            });
            date = date.clone();
            date.add(1, 'd');
        }
        return days;
    }   
}

angular.module('app')
	.service('ReservationService', ReservationService)
    .component('calendar', {
        templateUrl: 'features/home/calendar/calendar.html',
        controller: CalendarController,
        controllerAs: '$cal',
        bindings: { selected: '='}
});