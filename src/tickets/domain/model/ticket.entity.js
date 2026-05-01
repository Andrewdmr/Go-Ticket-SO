export class Ticket {
    constructor({id_ticket, id_event, id_customer, id_payment, row_str, seat_number, price, status, locked_until } = {}) {
        this.id_ticket = id_ticket;
        this.id_event = id_event;
        this.id_customer = id_customer;
        this.id_payment = id_payment;
        this.row_str = row_str;
        this.seat_number = seat_number;
        this.price = price;
        this.status = status;
        this.locked_until = locked_until;
    }
}