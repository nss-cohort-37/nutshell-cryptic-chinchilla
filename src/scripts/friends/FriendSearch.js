import { useUsers } from "../users/UsersProvider.js";
import { SaveFriends, useFriends } from "./FriendsProvider.js";
import { render } from "./FriendsList.js";

const eventHub = document.querySelector(".container");

export const addSearchEventListeners = () => {
  eventHub.addEventListener("click", clickEvent => {
    if (clickEvent.target.id === "saveFriend") {
      const friendUserName = document.querySelector("#friendSearch").value;
      const allUsers = useUsers();
      const foundUser = allUsers.find(user => user.userName === friendUserName);
      const friendInitiateId = parseInt(
        sessionStorage.getItem("activeUser"),
        10
      );
      const allFriends = useFriends();
      const foundExistingFriend = allFriends.find(
        friendRel =>
          friendRel.userId === foundUser.id &&
          friendInitiateId === friendRel.friendInitiateId
      );
      if (foundExistingFriend === undefined) {
        const newFriend = {
          friendInitiateId: friendInitiateId,
          userId: foundUser.id,
          active: true
        };
        SaveFriends(newFriend).then(() => {
          const updatedFriends = useFriends();
          const activeUserId = parseInt(
            sessionStorage.getItem("activeUser"), 10);
          const updatedFoundFriendsArray = updatedFriends.filter(
            friendRel => friendRel.friendInitiateId === activeUserId
          );

          render(updatedFoundFriendsArray);
        });
      } else {
        alert("User is already a friend");
      }
    }
  });
};
