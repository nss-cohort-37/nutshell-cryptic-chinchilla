import { NavbarEventListener } from "./navbar/navbarList.js";
import { FriendsListComponent } from "./friends/FriendsList.js";
import { getFriends } from "./friends/FriendsProvider.js";

NavbarEventListener()
getFriends().then(
FriendsListComponent)