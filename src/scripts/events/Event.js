export const EventComponent = event => {
  return `
    <section class="eventCard">
      <div class="eventCardInfo">Name: ${event.name}</div>
      <div class="eventCardInfo">Date: ${event.date}</div>
      <div class="eventCardInfo">Location: ${event.location}</div>
      <div class="editButtonContainer--${event.id}"></div>
    </section>
  `;
};