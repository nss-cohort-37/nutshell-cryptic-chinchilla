import { useUsers } from "../users/UsersProvider.js";
import { useFriends } from "../friends/FriendsProvider.js";

const eventHub = document.querySelector(".container");



  export const FriendSearchComponent = () => {
    return `<label for="friendSearch">Add a Friend: </label>
  <input type="search" placeholder="Search Username" id="friendSearch">
  <button id="saveFriend" class="btn btn-secondary">Save</button>`;
  }

 


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
      const newFriend = new CustomEvent("newFriend", {
        detail: {
        friendInitiateId: friendInitiateId,
        userId: foundUser.id,
        active: true
        }
      })
      eventHub.dispatchEvent(newFriend)
      
    } else {
      alert("User is already a friend");
    }
  }
});
