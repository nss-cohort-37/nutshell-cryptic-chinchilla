const eventHub = document.querySelector(".container");
const contentElement = document.querySelector(".friendSearchContainer");

export const initiateFriendSearchComponent = () => {
  const FriendSearchComponent = () => {
    return `<label for="friendSearch">Add a Friend: </label>
  <input type="search" placeholder="Search Username" id="friendSearch">
  <button id="saveFriend" class="btn btn-secondary">Save</button>`;
  }

  const renderSearch = () => {
    contentElement.innerHTML = `${FriendSearchComponent()}`;
  };
  renderSearch()
};
