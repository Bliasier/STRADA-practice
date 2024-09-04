import { mainUI } from "./ui-elements.js";
import { loadMessages } from "./loadMessages.js";
import { indexStep } from "./consts.js";

export function scrollEvent(e) {
  e.preventDefault();

  let topScroll = mainUI.chat.scrollTop * -1;
  let currentScrollHeight = getScrollHeight() - topScroll - 1;

  let startIndex = findMsgCount() - indexStep;
  let endIndex = startIndex + indexStep;

  if (topScroll >= currentScrollHeight) {
    loadMessages(startIndex, endIndex);
  }
}

function findMsgCount() {
  const msgCount = document.querySelectorAll(".message").length;
  return msgCount * -1;
}

function getScrollHeight() {
  return (
    mainUI.chat.scrollHeight - mainUI.chat.scrollTop - mainUI.chat.clientHeight
  );
}
