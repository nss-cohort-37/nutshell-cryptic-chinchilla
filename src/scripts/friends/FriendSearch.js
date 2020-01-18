const eventHub = document.querySelector(".container");
const contentElement = document.querySelector(".friendSearchContainer");

export const initiateFriendSearchComponent = () => {
  const FriendSearchComponent = () => {
    return `<label for="friendSearch">Add a Friend: </label>
  <input type="search" placeholder="Search Username" id="friendSearch">
  <button id="saveFriend" class="btn btn-secondary">Save</button>`;
  };

  eventHub.addEventListener("click", clickEvent => {
    if (
      clickEvent.target.id === "button--saveUser" ||
      clickEvent.target.id === "button--logIn"
    ) {
      
      renderSearch();
    }
  });

  const renderSearch = () => {
    contentElement.innerHTML = `${FriendSearchComponent()}`;
  };
  FriendSearchComponent()
};
