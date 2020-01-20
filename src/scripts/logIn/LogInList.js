import { logInForm } from "./LogInForm.js";
import { useUsers } from "../users/UsersProvider.js";

const eventHub = document.querySelector(".container");

export const logInList = () => {
  const contentTarget = document.querySelector(".logInForm");
  contentTarget.innerHTML = `${logInForm()}`;
};
