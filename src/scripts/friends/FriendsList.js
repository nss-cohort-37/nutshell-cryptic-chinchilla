import { FriendCard } from "./FriendCard.js";
import { useFriends, SaveFriends } from "./FriendsProvider.js";

const eventHub = document.querySelector(".container");
const contentElement = document.querySelector(".friendsCards");

eventHub.addEventListener("newFriend", event => {
  SaveFriends(event.detail).then(() => {
    const updatedFriends = useFriends();
    const activeUserId = parseInt(
      sessionStorage.getItem("activeUser"), 10);
    const updatedFoundFriendsArray = updatedFriends.filter(
      friendRel => friendRel.friendInitiateId === activeUserId
    );
    render(updatedFoundFriendsArray);
  })})

export const FriendsListComponent = () => {
  
      const allFriends = useFriends();
      const activeUserId = parseInt(sessionStorage.getItem("activeUser"), 10);
      console.log("activeUserId");
      const foundFriendsArray = allFriends.filter(
        friendRel => friendRel.friendInitiateId === activeUserId
      );

      render(foundFriendsArray);

}
      //custom event that says a new friend should be added to friends table

     


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
    
  

  export const render = foundFriendsArray => {
    contentElement.innerHTML = `
  ${foundFriendsArray
    .map(foundFriend => {
      return FriendCard(foundFriend);
    })
    .join("")}
  `;
  };

