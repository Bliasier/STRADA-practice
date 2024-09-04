import { modals } from "./ui-elements.js";
import { ERRORS } from "./errors.js";
import { URL } from "./consts.js";
import { getEmailFromInput, getUserNameFromInput } from "./operations.js";
import { getTokenFromCookies } from "./operations.js";

async function getTokenToEmail(e) {
  e.preventDefault();

  const url = URL.USER.ANY;
  const user_email = getEmailFromInput();

  try {
    const response = await fetch(url, {
      method: "POST",
      body: JSON.stringify({ email: user_email }),
      headers: { "Content-Type": "application/json;charset=utf-8" },
    });

    return await response.json();
  } catch (error) {
    console.log("response error");
  }
}

async function setNickName(e) {
  e.preventDefault();

  const url = URL.USER.ANY;
  const userName = getUserNameFromInput();
  const token = getTokenFromCookies();

  try {
    const response = await fetch(url, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ name: userName }),
    });

    return { response, userName };
  } catch (error) {
    console.log("response error");
  }
}

async function getUserData() {
  const url = URL.USER.ME;
  const token = getTokenFromCookies();

  try {
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
        Authorization: `Bearer ${token}`,
      },
    });

    return await response.json();
  } catch (error) {
    console.log(ERRORS.RESPONSE.USER_NAME);
  }
}

async function getChatHistory() {
  const url = URL.MESSAGES;
  const token = getTokenFromCookies();

  try {
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
        Authorization: `Bearer ${token}`,
      },
    });

    const dataMessages = await response.json();
    return dataMessages.messages.reverse();
  } catch (error) {
    return console.log(ERRORS.RESPONSE.CHAT_HISTORY);
  }
}

export {
  getTokenToEmail,
  getUserData,
  setNickName,
  getEmailFromInput,
  getUserNameFromInput,
  getChatHistory,
};
