import { logInForm } from "./LogInForm.js";

const eventHub = document.querySelector(".container");

export const logInList = () => {
  const contentTarget = document.querySelector(".logInForm")
  contentTarget.innerHTML = `${logInForm()}`


}
