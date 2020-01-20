import { deleteFriends } from "./FriendsProvider.js";

const eventHub = document.querySelector(".container")


export const FriendCard = friend => {
  return `
    <section class="friendCard">
      <div class="friendCardInfo">${friend.user.userName}</div>
      <img class="picSize" src="./assets/hey-arnold.jpg">
      <button id="removeFriend--${friend.id}" class="removeFriendBtn">Remove Friend</button>
    </section>
  `;
};

eventHub.addEventListener("click", clickEvent => {
 if(clickEvent.target.id.startsWith("removeFriend--")){
   const [prefix, friendId] = clickEvent.target.id.split("--")

   deleteFriends(friendId).then(() => {
     const message = new CustomEvent ("friendDeleted")
     eventHub.dispatchEvent(message)
   })
 }

})