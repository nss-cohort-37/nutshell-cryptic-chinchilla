export const MessageForm = () => {
  return `
    <section class="messageFormCard">
      <fieldset>
        <form class="messageForm">
          <div class="messageFormInfo">
            Message: <br><textarea id="messageForm" type="text" placeholder="Please enter message....."></textarea>
          </div>
        </form>
        <button id="saveMessage" class="saveMessageBtn">Save Message</button>
      </fieldset>
    </section>
  `;
};