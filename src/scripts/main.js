import { NavbarEventListener } from "./navbar/navbarList.js";
import { FriendsListComponent } from "./friends/FriendsList.js";
import { getFriends } from "./friends/FriendsProvider.js";
import { addSearchEventListeners } from "./friends/FriendSearch.js";
import { getUsers } from "./users/UsersProvider.js";

NavbarEventListener();
getFriends()
  .then(getUsers)
  .then(FriendsListComponent)
  .then(addSearchEventListeners);
