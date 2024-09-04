import { buildMessageUI, distributeTo } from "./loadMessages.js";
import { authentication, BOTTOM } from "./consts.js";

const token = Cookies.get("token");

const SOCKET = new WebSocket(`wss://edu.strada.one/websockets?${token}`);
export function sendMsgToServer(msg) {
  SOCKET.send(JSON.stringify({ text: msg }));
}

if (SOCKET.OPEN) {
  SOCKET.onmessage = function (event) {
    if (event.data) {
      const data = JSON.parse(event.data);
      const message = buildMessageUI(data);
      distributeTo(BOTTOM, message);
    }
  };
}
