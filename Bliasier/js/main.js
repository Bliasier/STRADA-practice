import { mainUI, modals, closeBtn } from "./ui-elements.js";
import { closeModal, modalVisibilityWrapper, showModal } from "./modals.js";
import { getTokenToEmail, setNickName } from "./requests.js";
import { authentication, submit } from "./consts.js";
import { sendMsgToServer } from "./socket.js";
import { loadMessages } from "./loadMessages.js";
import { scrollEvent } from "./scroll.js";
import { setToken, getInputValue, getTokenFromCookies } from "./operations.js";

mainUI.inputForm.addEventListener("submit", sendMessage);
mainUI.btnSettings.addEventListener("click", modalVisibilityWrapper);
modals.settings.btnChangeName.addEventListener("click", setNickName);
modals.authentication.btnGetToken.addEventListener("click", getTokenToEmail);
modals.authentication.btnEnterCode.addEventListener(
  "click",
  modalVisibilityWrapper,
);

mainUI.inputMessage.addEventListener("input", show);
modals.submit.btnEnter.addEventListener("click", setToken);
mainUI.chat.addEventListener("scroll", scrollEvent);

closeBtn.forEach((btn) => {
  btn.addEventListener("click", modalVisibilityWrapper);
});

function show(e) {
  e.preventDefault();
  if (e.target.value === "@") {
    console.log("asdas");
    showModal("link");
  }
}

function sendMessage(event) {
  event.preventDefault();
  const inputText = getInputValue();

  if (inputText.length < 1 || inputText.length > 50) {
    alert("Please enter a message");
    return;
  } else {
    sendMsgToServer(inputText);
    mainUI.inputMessage.value = "";
  }
}

function loginCheck() {
  if (getTokenFromCookies() === undefined) {
    showModal(authentication);
  } else {
    loadMessages();
  }
}

loginCheck();
