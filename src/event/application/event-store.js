import { ref, onMounted } from 'vue';
import { EventApi } from '../infrastructure/services/event-api.js';
import {Event} from "../domain/model/event.entity.js";

const api = new EventApi();

export function useEvents() {

    const events = ref([]);

    const form = ref(new Event({}));

    const loadEvents = async () => {
        try {
            const res = await api.getEvents();
            events.value = res.data;
        } catch (error) {
            console.error(error);
        }
    };

    const saveEvent = async () => {

        const newEvent = new Event({
            ...form.value,
            sold: 0,
            image: 'https://picsum.photos/400/250'
        });

        await api.createEvent(newEvent);

        await loadEvents();

        form.value = new Event({});
    };

    const removeEvent = async (id) => {
        await api.deleteEvent(id);
        await loadEvents();
    };

    onMounted(loadEvents);

    return {
        events,
        form,
        loadEvents,
        saveEvent,
        removeEvent
    };
}