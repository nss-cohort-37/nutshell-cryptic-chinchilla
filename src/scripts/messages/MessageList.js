import { useMessages, saveMessage, editMessage } from "./MessagesProvider.js"
import { MessageComponent } from "./Messages.js"
import { MessageForm, editMessageListener, editMessageDialog } from "./MessageForm.js"
import { messageEditRender } from "./MessageEditRender.js"
const contentTarget = document.querySelector(".messagesContainer")
const formTarget = document.querySelector(".messagesForm")
const eventHub = document.querySelector('.container')

export const MessageList = () => {
    const messages = useMessages()
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
    const render = (messages) => {
        contentTarget.innerHTML = messages.map(message => {
            // Get HTML representation of product
            const html = MessageComponent(message)
            
            return html
        }).join("")
    }
    
    
    
    const renderForm = () => {
        formTarget.innerHTML = MessageForm()
    }
    
    //edit MESSAGE BUTTON
    eventHub.addEventListener("editMessageButtonClicked", event => {
        const messageToEdit = event.detail.messageId
        const allMessages = useMessages()
        const foundMessage = allMessages.find(
            (currentMessage) => {
              return currentMessage.id === parseInt(messageToEdit, 10)
            }
          )
          document.querySelector("#entry-id").value = foundMessage.id
          document.querySelector(`#messageText--${messageToEdit}`).value = foundMessage.message      
        })

        //saves edit message
    eventHub.addEventListener("click", clickEvent => {
        if (clickEvent.target.id.startsWith("saveEdit")) {
          const [prefix, id] = clickEvent.target.id.split("--")
          const editedMessage = {
              id: parseInt(document.querySelector("#entry-id").value, 10),
              message: document.querySelector(`#messageText--${id}`).value,
              userId: parseInt(sessionStorage.getItem('activeUser'), 10)
            }
          editMessage(editedMessage)
          .then(() => {
              const updatedMessages = useMessages()
            render(updatedMessages)
            messageEditRender(updatedMessages)
            renderForm()
        })
    }
})
//SAVE MESSAGE
    render(messages)
    renderForm()
    eventHub.addEventListener("click", clickEvent => {
        if (clickEvent.target.id === "saveMessage" ) {
            console.log("heard save button")
            let messageUserId = parseInt(sessionStorage.getItem("activeUser"), 10)
            let messageText = document.getElementById("messageForm").value
            
            let newMessage = {
                userId: messageUserId,
                message: messageText
            }
            debugger
            saveMessage(newMessage)
            .then(() => {
                const updatedMessages = useMessages()
                render(updatedMessages)
                messageEditRender(updatedMessages)
                renderForm()
                
            })
        }
    })
    editMessageListener()
    messageEditRender(messages)
    editMessageDialog()

}