import { getMessages } from "./messages/MessagesProvider.js"
import { MessageList } from "./messages/MessageList.js"
import { editMessage } from "./messages/MessageForm.js"


getMessages()
.then(() => MessageList())

editMessage()   