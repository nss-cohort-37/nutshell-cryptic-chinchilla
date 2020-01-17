
import { logInList } from "./logIn/LogInList.js";
import { logInEvent } from "./logIn/LogInForm.js";
import { getUsers } from "./users/UsersProvider.js";
import { getEvents } from "./events/EventProvider.js"
import { EventList } from "./events/EventList.js"
import { getMessages } from "./messages/MessagesProvider.js"
import { MessageEventListener } from "./messages/MessageListener.js"
import { NavbarEventListener } from "./navbar/navbarList.js";

getUsers()
    .then(() => logInList())
    .then(() => logInEvent())
    .then(() => getMessages())
    .then(() => MessageEventListener())
    .then(() => getEvents())
    .then(() => EventList())

NavbarEventListener()