export const EventsForm = () => {
    return `
    <dialog class="eventDialog">
        <button id="xOutEventDialog">[X]</button>
        <div class="eventTitle">
            <label for="eventTitleText">Event title: </label>
            <input type="text" id="eventTitleText"></input>
        </div>
        <div class="eventDate">
            <label for="eventDateTime">Event date/time: </label>
            <input type="datetime-local" id="eventDateTime"></input>
        </div>
        <div class="eventLocation">
            <label for="eventLocationText">Event location: </label>
            <input type="text" id="eventLocationText"></input>
        </div>
        <button id="closeEventDialog">Save event</button>
    </dialog>
    `
}