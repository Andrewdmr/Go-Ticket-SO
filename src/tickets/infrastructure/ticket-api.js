
import axios from 'axios';
const ticketEndpoints = import.meta.env.VITE_TICKET_ENDPOINTS;
const baseApi =import.meta.env.VITE_GO_TICKET_API_URL;
const http = axios.create({
    baseURL: baseApi,
})


export class TicketApi {

    getTickets() {
        return http.get(`${ticketEndpoints}`);
    }
}