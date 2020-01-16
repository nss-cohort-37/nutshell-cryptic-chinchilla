import { getMessages } from "./messages/MessagesProvider.js"
import { MessageList } from "./messages/MessageList.js"

getMessages()
    .then(() => MessageList())