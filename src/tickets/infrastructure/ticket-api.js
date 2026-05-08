import {BaseApi} from "../../shared/infrastructure/base-api.js";
import {BaseEndpoint} from "../../shared/infrastructure/base-endpoint.js";

const ticketEndpointsPath = import.meta.env.VITE_TICKET_ENDPOINT;

export class TicketApi extends BaseApi {
    #ticketsEndpoint;

    constructor() {
        super();
        this.#ticketsEndpoint = new BaseEndpoint(this, ticketEndpointsPath);
    }


    getTickets() {
        return this.#ticketsEndpoint.getAll();
    }

    createTicket(data) {
        return this.#ticketsEndpoint.create(data);
    }

}