import { getUsers } from "./users/UsersProvider.js";
import { getEvents } from "./events/EventProvider.js"
import { getMessages } from "./messages/MessagesProvider.js"
import { getFriends } from "./events/FriendsProvider.js"
import { getNews } from "./news/NewsProvider.js"
import { logInList } from "./logIn/LogInList.js";
import { logInEvent } from "./logIn/LogInForm.js";
import { MessageEventListener } from "./messages/MessageListener.js"
import { EventsEventListener } from "./events/EventsListener.js"
import { NewsListener } from "./news/NewsListener.js"
import { NavbarEventListener } from "./navbar/navbarList.js";

getUsers()
    .then(() => logInList())
    .then(() => logInEvent())
    .then(() => getMessages())
    .then(() => MessageEventListener())
    .then(() => getEvents())
    .then(() => getFriends())
    .then(() => EventsEventListener())
    .then(() => getNews())
    .then(() => NewsListener())

NavbarEventListener()