import { FriendCard } from "./FriendCard.js";
import { useFriends, SaveFriends } from "./FriendsProvider.js";
import { useUsers } from "../users/UsersProvider.js";

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
  })
})

eventHub.addEventListener("friendNameClicked", event => {
  const userName = event.detail.friendUserName
  const updatedFriends = useFriends();
  const activeUserId = parseInt(
    sessionStorage.getItem("activeUser"), 10);
  const allUsers = useUsers();
  const foundUser = allUsers.find(user => user.userName === userName);
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

  if (activeUserId !== foundUser.id) {
    if (foundExistingFriend === undefined) {
      const newFriendObject = {
        userId: foundUser.id,
        friendInitiateId: friendInitiateId,
        active: true
      }
      SaveFriends(newFriendObject).then(() => {
        const updatedFriends = useFriends();
        const updatedFoundFriendsArray = updatedFriends.filter(
          friendRel => friendRel.friendInitiateId === activeUserId
        );
        render(updatedFoundFriendsArray);
      })
    } else {
      alert("User is already a friend");
    }
  } else {
    alert("You can't add yourself, dummy")
  }
})


export const FriendsListComponent = () => {

  const allFriends = useFriends();
  const activeUserId = parseInt(sessionStorage.getItem("activeUser"), 10);
  const foundFriendsArray = allFriends.filter(
    friendRel => friendRel.friendInitiateId === activeUserId
  );

  render(foundFriendsArray);

}
//custom event that says a new friend should be added to friends table




eventHub.addEventListener("friendDeleted", () => {
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

