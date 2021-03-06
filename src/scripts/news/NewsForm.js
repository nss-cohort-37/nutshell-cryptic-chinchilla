export const NewsForm = () => {
    return `
    <dialog class="newsDialog">
        <button id="xOutNewsDialog">&times</button>
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
        <button id="closeNewsDialog" class="btn btn-primary">Save Article</button>
    </dialog>
    `
}