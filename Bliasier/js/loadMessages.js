import { getTemplateContent } from "./getTemplateContent.js";
import { mainUI } from "./ui-elements.js";
import { getChatHistory } from "./requests.js";
import { BOTTOM, TOP, myEmail, indexStep } from "./consts.js";
import { createChatDateElement } from "./operations.js";
const { getHours, getMinutes, format, eoLocale } = window.dateFns;

async function loadMessages(startIndex = -indexStep, endIndex) {
  const allMessages = await getChatHistory();
  const messagesInInterval = allMessages.slice(startIndex, endIndex).reverse();

  messagesInInterval.forEach((message) => {
    const nextMessage = defineNextMessage(allMessages, message);
    const dateOfCurrentMessage = defineMessageDate(message);
    const dateOfNextMessage = defineMessageDate(nextMessage);
    const messageContainer = buildMessageUI(message);

    if (dateOfCurrentMessage === dateOfNextMessage) {
      distributeTo(TOP, messageContainer);
    } else if (dateOfCurrentMessage !== dateOfNextMessage) {
      let messageDate = createChatDateElement(dateOfCurrentMessage);
      distributeTo(TOP, messageContainer);
      distributeTo(TOP, messageDate);
    }
  });
}

function defineNextMessage(arr, msg) {
  let currentMessageIndex = arr.indexOf(msg);
  let nextMessage = arr[currentMessageIndex - 1];
  return nextMessage;
}

function defineMessageDate(message) {
  let dateOfMessage = message.createdAt;
  let currentMessageDate = format(new Date(dateOfMessage), "d MMMM", {
    locale: eoLocale,
  });
  return currentMessageDate;
}

function distributeTo(position, message) {
  if (position === BOTTOM) {
    mainUI.chat.insertBefore(message, mainUI.chat.firstChild);
  } else if (position === TOP) {
    mainUI.chat.append(message);
  }
}

function dateWrangler(date) {
  date = new Date(date);
  const hours = getHours(new Date(date), "hh");
  const minutes = getMinutes(new Date(date), "mm");

  return `${hours}:${minutes}`;
}

function buildMessageUI(msg) {
  const { user, text, createdAt } = msg;
  const currentMessageTime = dateWrangler(createdAt);

  const { messageContainer, userType, messageText, messageTime } =
    getTemplateContent();

  if (myEmail === user.email) {
    userType.className = "user-message message";
  } else {
    userType.className = "partner-message message";
  }

  messageText.textContent = `${user.name}: ${text}`;
  messageTime.textContent = currentMessageTime;

  return messageContainer;
}

function assignClass() {}

export { loadMessages, buildMessageUI, distributeTo };
