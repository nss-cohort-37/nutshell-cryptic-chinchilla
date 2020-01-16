import { useMessages, saveMessage } from "./MessagesProvider.js"
import { MessageComponent } from "./Messages.js"
import { MessageForm } from "./MessageForm.js"

const contentTarget = document.querySelector(".messagesContainer")
const formTarget = document.querySelector(".messagesForm")
const eventHub = document.querySelector('.appContainer')

export const MessageList = () => {
    const messages = useMessages()
    const userId = sessionStorage.getItem("activeUser")

    eventHub.addEventListener("click", clickEvent => {
        if (clickEvent.target.classList.contains("saveMessage")) {
            let messageUserId = userId
            let messageText = document.getElementById("messageForm").value

            let newMessage = {
                userId: messageUserId,
                message: messageText
            }

            const sentMessage = new CustomEvent("messageSent", {
                detail: {
                    wasMessageSent: "Yes"
                }
            })

            saveMessage(message)
                .then(() => eventHub.dispatchEvent(sentMessage))
        }
    })

    eventHub.addEventListener("messageSent", messageEvent => {
        const sentStatus = messageEvent.detail.wasMessageSent
        if (sentStatus === "yes") {
            const updatedMessages = useMessages()
            contentTarget.innerHTML = updatedMessages.map(message => {
                // Get HTML representation of product
                const html = Message(message)
    
                return html
            }).join("")
        }
    })

    const render = () => {
        contentTarget.innerHTML = messages.map(message => {
            // Get HTML representation of product
            const html = MessageComponent(message)

            return html
        }).join("")
    }

    const renderForm = () => {
        formTarget.innerHTML = MessageForm()
    }

    render()
    renderForm()
}

export default MessageList