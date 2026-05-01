import {reactive} from "vue";
import {TicketApi} from "../infrastructure/ticket-api.js";
import {TicketAssembler} from "../infrastructure/ticket-assembler.js";

const ticketApi = new TicketApi();

export const TicketStore = reactive({

    tickets : [],
    errors : [],

    loadTickets(){
        const onSuccess = (response) => {
            this.tickets = TicketAssembler.toEntityFromResponse(response);
        }


        const onError = (error) => {
            this.errors.push(error);
            this.tickets = [];
            console.error("Api fetch failed", error.message, error.response?.status, error.response?.data)
        }

        ticketApi.getTickets().then(onSuccess).catch(onError);

    }
})