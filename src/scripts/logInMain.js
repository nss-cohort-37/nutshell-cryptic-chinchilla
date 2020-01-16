import { logInList } from "./logIn/LogInList.js";
import { logInEvent } from "./logIn/LogInForm.js";
import { getUsers } from "./users/UsersProvider.js";

getUsers().then( () => {
  logInList()
  logInEvent()
}
)