import { FriendCard } from "./FriendCard.js"
import { useFriends } from "./FriendsProvider.js"

const eventHub = document.querySelector(".container")

export const FriendsList = () => {

const friends = useFriends()
const activeUserId = parseInt(sessionStorage.getItem("activeUser"), 10)
console.log("activeUserId")

}
