import { logInList } from "./logIn/LogInList.js";
import { logInEvent } from "./logIn/LogInForm.js";
import { getUsers } from "./users/UsersProvider.js";
import { getMessages, editMessage } from "./messages/MessagesProvider.js"
import { MessageEventListener } from "./messages/MessageListener.js"
import { NavbarEventListener } from "./navbar/navbarList.js";

getUsers()
    .then(() => logInList())
    .then(() => logInEvent())
    .then(() => getMessages())
    .then(() => MessageEventListener())

NavbarEventListener()

