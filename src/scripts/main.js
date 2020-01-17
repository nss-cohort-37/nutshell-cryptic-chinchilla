import { getEvents } from "./events/EventProvider.js"
import { getUsers } from "./users/UsersProvider.js"
import { EventList } from "./events/EventList.js"
import { NavbarEventListener } from "./navbar/navbarList.js"

getUsers()

getEvents()
    .then(() => EventList())

NavbarEventListener()