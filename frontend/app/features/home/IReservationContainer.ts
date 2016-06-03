export interface IReservationContainer {
    date: string;
    reservations: IReservation[];
}

export interface IReservation {
    id: string;
    time: string;
    email: string;
    reserved: boolean;
    firstname: string;
    lastname: string;
}