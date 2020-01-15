const MessageComponent = (message) => {
    
    return `
        <section class="message">
            <div class="messageUsername">
                ${message.user.username}: 
            </div>
            <div class="messageContent>
                ${message.message}
            </div>
            <div class="messageEditButton">
                <button id="editMessage--${message.id}">
                    Edit Message
                </button>
            </div>

            <dialog class="messageDialog" id="messageEditDialog">
                <input type="text" id="messageText--${message.id}" value="${message.message}"></input>
                <button id="saveEdit--${message.id}">
                    Save Edit
                </button>
            </dialog>
        </section>
    `
}

export default CriminalComponent