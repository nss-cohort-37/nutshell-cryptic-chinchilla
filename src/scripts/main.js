import { logInList } from "./logIn/LogInList.js";
import { logInEvent } from "./logIn/LogInForm.js";
import { getUsers } from "./users/UsersProvider.js";
import { getMessages } from "./messages/MessagesProvider.js";
import { MessageEventListener } from "./messages/MessageListener.js";
import { NavbarEventListener } from "./navbar/navbarList.js";
import { FriendsListComponent} from "./friends/FriendsList.js";
import { getFriends } from "./friends/FriendsProvider.js";
import { addSearchEventListeners } from "./friends/FriendSearchList.js";
import { initiateFriendSearchComponent } from "./friends/FriendSearch.js";
import { FriendRender } from "./friends/FriendsList.js";

if(!(sessionStorage.hasOwnProperty("activeUser"))){
getUsers()
  .then(() =>{
  logInList()})
  .then(() => logInEvent())
  .then(() => getMessages())
  .then(() => MessageEventListener())
  .then(getFriends)
  .then(getUsers)
  .then(() => {
    initiateFriendSearchComponent()
    FriendsListComponent();
    addSearchEventListeners();
    NavbarEventListener();
  })}else{
    getUsers().then(getMessages)
  .then(() => MessageEventListener())
  .then(getFriends)
  .then(getUsers)
  .then(() => {
    FriendRender()
    FriendsListComponent()
    addSearchEventListeners()
    NavbarEventListener()
  })}
