export const MessageComponent = (message) => {
    return `
        <section class="message">
            <div class="messageUsername">
                ${message.user.userName}: 
            </div>
            <div class="messageContent">
                ${message.message}
            </div>
            <button id="editMessage--${message.id}">Edit Message</button>
            <dialog  id="details--${message.id}" class="editDialog">
            <input type="hidden" class="hiddenId" id="entry-id"/>
            <input type="text" id="messageText--${message.id}" value="${message.message}"></input>
            <button id="saveEdit--${message.id}" class="button--close">Save Edit</button>
            </dialog>
        </section>
    `
}

    
