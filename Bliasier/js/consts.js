import { getChatHistory, getUserData } from "./requests.js";

const settings = "settings";
const submit = "submit";
const authentication = "authentication";

const URL = {
  MESSAGES: "https://edu.strada.one/api/messages/",
  USER: {
    ANY: "https://edu.strada.one/api/user",
    ME: "https://edu.strada.one/api/user/me",
  },
};

const BOTTOM = "bottom";
const TOP = "top";
const token = Cookies.get("token");

const data = await getUserData();
const myEmail = data.email;

const indexStep = 30;

export {
  settings,
  submit,
  authentication,
  URL,
  TOP,
  BOTTOM,
  token,
  myEmail,
  indexStep,
};
