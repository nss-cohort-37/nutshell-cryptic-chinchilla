const eventHub = document.querySelector(".container")

export const logInForm = () => {
  return `
  <h1>Welcome!</h1>
  <h3>Please Log In or Register!</h3>
  <div class="logInUserContainer">
    <label for="logInUser">User Name:</label>
    <input type="text" class="logInUser" name="logInUser">  
  </div>
  <div class="logInPassContainer"> 
    <label for="logInPass">Password:</label>
    <input type="text" class="logInPass" name="logInPass">
    <br>
    <button id="button--logIn">Log In/Register</button>
  </div>
  `

eventHub.addEventListener()

}