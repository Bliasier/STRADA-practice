const closeBtn = document.querySelectorAll(".close-btn");

const mainUI = {
  inputForm: document.querySelector(".message-input"),
  inputMessage: document.getElementById("write-message"),
  userMessage: document.querySelectorAll(".user-message"),
  allMessages: document.querySelectorAll(".message"),
  template: document.querySelector("#template"),
  btnSettings: document.querySelector("#settings"),
  chat: document.querySelector(".chat"),
};

const modals = {
  authentication: {
    window: document.querySelector("#auth-modal"),
    getEmail: document.querySelector("#input-mail"),
    btnGetToken: document.querySelector("#get-code"),
    btnEnterCode: document.querySelector("#enter-code-btn"),
  },
  submit: {
    window: document.querySelector("#submit-modal"),
    tokenInput: document.querySelector("#input-token"),
    btnEnter: document.querySelector("#enter-btn"),
  },
  settings: {
    window: document.querySelector("#setting-modal"),
    userName: document.querySelector("#choose-name"),
    btnChangeName: document.querySelector("#change-name-btn"),
  },
  link: {
    window: document.querySelector(".link-modal"),
    userName: document.querySelector(".user-name"),
  },
};

export { mainUI, modals, closeBtn };
