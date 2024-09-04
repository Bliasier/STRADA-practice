import { mainUI } from "./ui-elements.js";

export function getTemplateContent() {
  const messageContainer = mainUI.template.content.cloneNode(true);
  const userType = messageContainer.querySelector(".user-message");
  const messageText = messageContainer.querySelector(".messageText");
  const messageTime = messageContainer.querySelector(".message_time");
  return { userType, messageContainer, messageTime, messageText };
}
