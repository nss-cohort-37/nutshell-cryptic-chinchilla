export const EventComponent = event => {
  return `
    <section class="eventCard">
      <div class="eventCardInfo">Name: ${event.name}</div>
      <div class="eventCardInfo">Date: ${event.date}</div>
      <div class="eventCardInfo">Location: ${event.location}</div>
      <div class="editButtonContainer--${event.id}"></div>
      <dialog  id="details--${event.id}" class="editEventDialog">
        <input type="text" id="eventName--${event.id}" value="${event.name}"></input>
        <input type="text" id="eventLocation--${event.id}" value="${event.location}"></input>
        <button id="saveEdit--${event.id}" class="button--close">Save Edit</button>
      </dialog>
    </section>
  `;
};