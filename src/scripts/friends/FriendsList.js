import { FriendCard } from "./FriendCard.js";
import { useFriends } from "./FriendsProvider.js";

const eventHub = document.querySelector(".container");
const contentElement = document.querySelector(".friendsCards");

export const FriendsListComponent = () => {
  eventHub.addEventListener("click", clickEvent => {
    if (
      clickEvent.target.id === "button--saveUser" ||
      clickEvent.target.id === "button--logIn"
    ) {
      const allFriends = useFriends();
      const activeUserId = parseInt(sessionStorage.getItem("activeUser"), 10);
      console.log("activeUserId");
      const foundFriendsArray = allFriends.filter(
        friendRel => friendRel.friendInitiateId === activeUserId
      );

      render(foundFriendsArray);

      eventHub.addEventListener("friendDeleted", () => {
        console.log("deleted friend event heard");
        const updatedFriends = useFriends();
        const activeUserId = parseInt(sessionStorage.getItem("activeUser"), 10);
        const updatedFoundFriendsArray = updatedFriends.filter(
          friendRel => friendRel.friendInitiateId === activeUserId
        );
        contentElement.innerHTML = "";
        render(updatedFoundFriendsArray);
      });
    }
  });
}
  export const render = foundFriendsArray => {
    contentElement.innerHTML = `
  ${foundFriendsArray
    .map(foundFriend => {
      return FriendCard(foundFriend);
    })
    .join("")}
  `;
  };

