import { useUsers } from "../users/UsersProvider.js";
import { SaveFriends, useFriends } from "./FriendsProvider.js";
import { render } from "./FriendsList.js";
import {FriendSearchComponent} from "./FriendSearch.js"

const contentElement = document.querySelector(".friendSearchContainer");
const eventHub = document.querySelector(".container");

export const addSearchEventListeners = () => {

 

  const renderSearch = () => {
    contentElement.innerHTML = `${FriendSearchComponent()}`;
  };
  renderSearch()
};
  
