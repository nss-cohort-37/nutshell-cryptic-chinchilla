import { useMessages } from "./MessagesProvider.js"
import Message from "./Messages.js"

const contentTarget = document.querySelector(".messages")
const eventHub = document.querySelector('.container')

export const MessageList = () => {
    const messages = useMessages()

    const render = () => {
        contentTarget.innerHTML = messages.map(message => {
            // Get HTML representation of product
            const html = Message(message)

            return html
        }).join("")
    }

    render()
}

export default MessageList