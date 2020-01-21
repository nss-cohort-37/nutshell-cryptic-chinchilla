import { saveUser, useUsers } from "../users/UsersProvider.js";
import { refreshDashboard, initiateDashboardEventListener } from "../dashboardEvents/DashboardLoad.js";

const eventHub = document.querySelector(".container");

export const logInForm = () => {
  sessionStorage.clear();
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
          <br>
          <label for="confirmPass">Confirm Password:</label>
          <input type="password" class="confirmPass" name="confirmPass">
        </div>
        <br>
          <button id="button--saveUser">Register</button>
      `;
    }
    if (event.target.id === "button--logIn") {
      const users = useUsers();
      const userName = document.querySelector(".logInUser").value;
      const userNamePW = document.querySelector(".logInPass").value;
      const foundUser = users.find(user => user.userName === userName);
      const foundUserPassWord = users.find(
        user => user.password === userNamePW
      );
      if (foundUser === undefined) {
        alert("Please register a new Account!");
      }
      if (foundUserPassWord === undefined) {
        alert("Incorrect Password!");
      } else {
        sessionStorage.setItem("activeUser", foundUser.id);
        const contentTarget = document.querySelector(".logInForm");
        contentTarget.innerHTML = ""
        initiateDashboardEventListener()
      }
    }
    if (event.target.id === "button--saveUser") {
      let userNameValue = document.querySelector(".registerUser").value;
      let emailValue = document.querySelector(".registerEmail").value;
      let passwordValue = document.querySelector(".registerPass").value;
      let confirmPass = document.querySelector(".confirmPass").value;
      if (userNameValue === "" || emailValue === "" || passwordValue === "") {
        alert("Please fill out all Fields");
      } else if (passwordValue !== confirmPass) {
          alert("Your Password don't match!!!!!!!!!!")
      } else {
        const newUser = {
          userName: userNameValue,
          email: emailValue,
          password: passwordValue
        };
        saveUser(newUser).then(() => {
          const users = useUsers();
          const foundUser = users.find(user => user.userName === userNameValue)
          sessionStorage.setItem("activeUser", foundUser.id);
          const contentTarget = document.querySelector(".logInForm");
          contentTarget.innerHTML = ""
          refreshDashboard()
        });
      }
    }
  });
};
