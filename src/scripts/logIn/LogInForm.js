import { saveUser, useUsers } from "../users/UsersProvider.js";

const eventHub = document.querySelector(".container");

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
    </div>
    <div class="logInButtons">
      <button id="button--logIn">Log In</button>
      <button id="button--register">Register</button>
    </div>
  `;
};

export const logInEvent = () => {
  eventHub.addEventListener("click", event => {
    if (event.target.id === "button--register") {
      const contentTarget = document.querySelector(".logInForm");
      contentTarget.innerHTML = `
        <h3>Please Register</h3>
        <div class="registerUserContainer">
          <label for="registerUser">User Name:</label>
          <input type="text" class="registerUser" name="registerUser">  
        </div>
        <div class="registerEmailContainer">
          <label for="registerEmail">Email:</label>
          <input type="text" class="registerEmail" name="registerEmail">  
        </div>
        <div class="registerPassContainer"> 
          <label for="registerPass">Password:</label>
          <input type="password" class="registerPass" name="registerPass">
        </div>
        <br>
          <button id="button--saveUser">Register</button>
      `;
    }

    if (event.target.id === "button--logIn") {
      const users = useUsers();
      const userName = document.querySelector(".logInUser").value;
      const userNamePw = document.querySelector(".logInPass").value;
      const foundUser = users.find(user => user.userName === userName);
      const foundUserPW = users.find(
        user => user.password === parseInt(userNamePw)
      );

      if (foundUser === undefined) {
        alert("Please register a new Account");
      } else if (foundUserPW === undefined) {
        alert("Incorrect Password!");
      } else {
        sessionStorage.setItem("activeUser", foundUser.id);
        const contentTarget = document.querySelector(".logInForm")
        contentTarget.innerHTML=""
      }
    }

    if (event.target.id === "button--saveUser") {
      let userNameValue = document.querySelector(".registerUser").value;
      let emailValue = document.querySelector(".registerEmail").value;
      let passwordValue = document.querySelector(".registerPass").value;
      if (userNameValue === "" || emailValue === "" || passwordValue === "") {
        alert("Please fill out all Fields");
      } else {
        const newUser = {
          userName: userNameValue,
          email: emailValue,
          password: passwordValue
        };
        saveUser(newUser).then(() => {
          const users = useUsers();
          const foundUser = users.find(user => user.userName === userNameValue);
          // if (sessionStorage.hasOwnProperty("activeUser")) {
          //   sessionStorage.removeItem("activeUser")
          // }
          sessionStorage.setItem("activeUser", foundUser.id);
          const contentTarget = document.querySelector(".logInForm")
          contentTarget.innerHTML=""
        });
      }
    }
  });
};
