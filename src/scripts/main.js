import { getEvents } from "./events/EventProvider.js"
import { EventList } from "./events/EventList.js"

getEvents()
    .then(() => EventList())