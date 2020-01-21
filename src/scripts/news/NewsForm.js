export const NewsForm = () => {
    return `
    <dialog class="newsDialog">
        <button id="xOutNewsDialog">[X]</button>
        <div class="newsTitle">
            <label for="newsTitleText">Article title: </label>
            <input type="text" id="newsTitleText"></input>
        </div>
        <div class="newsSynopsis">
            <label for="newsSynopsisText">Article synopsis: </label>
            <input type="text" id="newsSynopsisText"></input>
        </div>
        <div class="newsURL">
            <label for="newsURLText">Article URL: </label>
            <input type="text" id="newsURLText"></input>
        </div>
        <div class="newsDate">
            <label for="newsDateText">Article date: </label>
            <input type="date" id="newsDateText"></input>
        </div>
        <button id="closeNewsDialog">Save Article</button>
    </dialog>
    `
}