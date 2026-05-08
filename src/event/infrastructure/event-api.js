import axios from 'axios';
import {BaseApi} from "../../shared/infrastructure/base-api.js";
import {BaseEndpoint} from "../../shared/infrastructure/base-endpoint.js";



const eventEndpointsPath = import.meta.env.VITE_EVENT_ENDPOINT;

export class EventApi extends BaseApi {
    #eventEndpoints;

    constructor(){
        super();
        this.#eventEndpoints = new BaseEndpoint(this, eventEndpointsPath);
    }
    getEvents() {
        return this.#eventEndpoints.getAll();
    }

    createEvent(event) {
        return this.#eventEndpoints.create(event);
    }

    updateEvent(id, event) {
        return this.#eventEndpoints.update(id, event);
    }

    deleteEvent(id) {
        return this.#eventEndpoints.delete(id);
    }
}