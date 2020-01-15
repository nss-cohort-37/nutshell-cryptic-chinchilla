export const FriendCard = friend => {
  return `
    <section class="friendCard">
      <div class="friendCardInfo">${friend.name}</div>
      <img class="picSize" src="./assets/hey-arnold.jpg">
      <button id="removeFriend--${friend.id}" class="removeFriendBtn">Remove Friend</button>
    </section>
  `;
};
