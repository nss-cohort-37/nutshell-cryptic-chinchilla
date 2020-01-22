export const EventComponent = event => {
  return `
    <section class="eventCard">
      <div class="eventCardInfo">Name: ${event.name}</div>
      <div class="eventCardInfo">Date: ${event.date}</div>
      <div class="eventCardInfo">Location: ${event.location}</div>
      <div class="editButtonContainer--${event.id}" style="float: left; margin-right: 5px;"></div>
      <div class="deleteButtonContainer--${event.id}"></div>
      <dialog  id="eventDetails--${event.id}" class="editEventDialog">
        <button id="xOutEventEditDialog--${event.id}">&times</button>
        <label for="eventName--${event.id}">Event name:</label>
        <input type="text" id="eventName--${event.id}" value="${event.name}"></input>
        <label for="eventLocation--${event.id}">Event location:</label>
        <input type="text" id="eventLocation--${event.id}" value="${event.location}"></input>
        <p id="eventDate--${event.id}">Date: ${event.date}</p>
        <button id="saveEventEdit--${event.id}" class="button--close btn btn-primary">Save Edit</button>
      </dialog>
    </section>
  `;
};