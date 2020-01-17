import { getMessages } from "./messages/MessagesProvider.js"
import { MessageList } from "./messages/MessageList.js"
import { logInList } from "./logIn/LogInList.js";
import { logInEvent } from "./logIn/LogInForm.js";
import { getUsers } from "./users/UsersProvider.js";
import { NavbarEventListener } from "./navbar/navbarList.js";

getMessages()
    .then(() => MessageList())

getUsers().then(() => {
    logInList()
    logInEvent()    
})

NavbarEventListener()
