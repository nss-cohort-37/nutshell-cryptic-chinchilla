import { deleteFriends } from "./FriendsProvider.js";

const eventHub = document.querySelector(".container")


export const FriendCard = friend => {
  return `
    <section class="friendCard card" style="width: 10rem;">
    <img class="picSize card-img-top" src="./assets/aliens.png">
      <h5 class="friendCardInfo card-title">${friend.user.userName}</h5>
      <button id="removeFriend--${friend.id}" class="removeFriendBtn btn-danger">Remove Friend</button>
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