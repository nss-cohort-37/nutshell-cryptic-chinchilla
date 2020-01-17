import { logInList } from "./logIn/LogInList.js";
import { logInEvent } from "./logIn/LogInForm.js";
import { getUsers } from "./users/UsersProvider.js";
import { NavbarEventListener } from "./navbar/navbarList.js";


getUsers().then(() => {
    logInList()
    logInEvent()    
})

NavbarEventListener()
