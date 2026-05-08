import axios from 'axios';

const http = axios.create({
    baseURL: 'http://localhost:3000'
});

export class EventApi {

    getEvents() {
        return http.get('/events');
    }

    createEvent(event) {
        return http.post('/events', event);
    }

    updateEvent(id, event) {
        return http.put(`/events/${id}`, event);
    }

    deleteEvent(id) {
        return http.delete(`/events/${id}`);
    }
}