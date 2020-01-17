export const EventsForm = () => {
    return `
    <dialog class="eventDialog">
        <div class="eventTitle">
            <label for="eventTitleText">Event title: </label>
            <input type="text" id="eventTitleText"></input>
        </div>
        <div class="eventDate">
            <label for="eventDateTime">Article synopsis: </label>
            <input type="datetime-local" id="eventDateTime"></input>
        </div>
        <div class="eventLocation">
            <label for="eventLocationText">Article URL: </label>
            <input type="text" id="eventLocationText"></input>
        </div>
        <button class="closeDialog">Save Article</button>
    </dialog>
    `
}