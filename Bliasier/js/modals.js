import { modals, mainUI } from "./ui-elements.js";
import { submit, settings, authentication } from "./consts.js";
import { getUserNames } from "./operations.js";
import { getChatHistory } from "./requests.js";

function showModal(modalName) {
  const modal = modals[modalName];
  modal.window.style.visibility = "visible";
  if (modalName === "link") {
    addLinks();
  }
}

function closeModal(modalName) {
  const modal = modals[modalName];
  modal.window.style.visibility = "hidden";
}

function collapseOtherModals() {
  for (let modalsKey in modals) {
    closeModal(modalsKey);
  }
}

function modalVisibilityWrapper(e) {
  e.preventDefault();

  console.log(e.target.id);
  switch (e.target.id) {
    case settings: {
      collapseOtherModals();
      showModal(settings);

      break;
    }
    case "enter-code-btn": {
      collapseOtherModals();
      showModal(submit);

      break;
    }
    case "auth-close": {
      closeModal(authentication);
      break;
    }
    case "submit-close": {
      closeModal(submit);
      break;
    }
    case "settings-close": {
      closeModal(settings);
      break;
    }
  }
}

async function addLinks() {
  const messagesHistory = await getChatHistory();
  const userNames = getUserNames(messagesHistory);
  const linkContainer = document.querySelector(".link-container");

  userNames.forEach((userName) => {
    const userLink = document.createElement("p");
    userLink.textContent = `@${userName} `;
    linkContainer.appendChild(userLink);
    linkContainer.addEventListener("click", (e) => {
      let targetElement = e.target;
      mainUI.inputMessage.value = targetElement.textContent;
      closeModal("link");
      mainUI.inputMessage.focus();
    });
  });
}

export { showModal, closeModal, modalVisibilityWrapper };
