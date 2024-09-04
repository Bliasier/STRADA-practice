import { mainUI, modals } from "./ui-elements.js";

function getTokenInput() {
  return modals.submit.tokenInput.value;
}

function setToken() {
  let token = getTokenInput();
  Cookies.set("token", token, { expires: 7 });
}

function getTokenFromCookies() {
  try {
    return Cookies.get("token");
  } catch (err) {
    console.log("Cookie not found");
  }
}

function getInputValue() {
  return mainUI.inputMessage.value;
}

function createChatDateElement(date) {
  let chatDate = document.createElement("li");
  chatDate.className = "chat-date";
  let dateText = document.createElement("p");
  dateText.className = "date-text";
  dateText.textContent = date;
  chatDate.appendChild(dateText);
  return chatDate;
}

function getEmailFromInput() {
  return modals.authentication.getEmail.value;
}

function getUserNameFromInput() {
  return modals.settings.userName.value;
}

function getUserNames(arr) {
  let userNames = [];

  arr.forEach((item) => {
    let userName = item.user.name;
    if (!userNames.includes(userName)) {
      userNames.push(userName);
    }
  });

  return userNames;
}

export {
  setToken,
  getTokenInput,
  getInputValue,
  getEmailFromInput,
  getUserNameFromInput,
  getTokenFromCookies,
  createChatDateElement,
  getUserNames,
};
