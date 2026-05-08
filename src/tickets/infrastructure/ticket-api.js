import axios from 'axios';
import {BaseApi} from "../../shared/infrastructure/base-api.js";
import {BaseEndpoint} from "../../shared/infrastructure/base-endpoint.js";


const http = axios.create({
    baseURL: baseApi
});

const ticketEndpointsPath = import.meta.env.VITE_TICKET_ENDPOINT;

#ticketsEndpoint;


export class TicketApi extends BaseApi {
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