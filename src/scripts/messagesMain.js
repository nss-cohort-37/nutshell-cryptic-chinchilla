import { getMessages } from "./messages/MessagesProvider.js"
import { MessageList } from "./messages/MessageList.js"
import { MessagesNavbarEventListener } from "./navbar/navbarList.js"

MessagesNavbarEventListener()
getMessages()
.then(() => MessageList())

editMessage()   