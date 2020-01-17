import { getMessages } from "./messages/MessagesProvider.js"
import { MessageList } from "./messages/MessageList.js"

getMessages()
    .then(() => MessageList())
import { NavbarEventListener } from "./navbar/navbarList.js";

NavbarEventListener()
