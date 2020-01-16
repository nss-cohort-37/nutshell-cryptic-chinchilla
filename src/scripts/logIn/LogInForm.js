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
    <input type="password" class="logInPass" name="logInPass">
    <br>
    <div class="logInButtons">
      <button id="button--logIn">Log In</button>
      <button id="button--register">Register</button>
    </div>
  </div>
  `
}

export const logInEvent = () => {
  eventHub.addEventListener("click", event => {
    if (event.target.id === "button--register") {

    }
  })
}
