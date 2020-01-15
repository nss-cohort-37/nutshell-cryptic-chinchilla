import { logInForm } from "./LogInForm.js";



export const logInList = () => {
  const contentTarget = document.querySelector(".logInForm")
  contentTarget.innerHTML = `${logInForm()}`


}
