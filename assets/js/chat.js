import { getSocket } from "./sockets";

const messages = document.getElementById("jsMessages");
const sendMsg = document.getElementById("jsSendMsg");
const timer = document.getElementById("jsTimer");

let currentTime = null;
let clearTimeId = null;

const appendMsg = (text, nickname) => {
  const li = document.createElement("li");
  li.innerHTML = `
    <span class="author ${nickname ? "out" : "self"}">${
    nickname ? nickname : "Me"
  }:</span> ${text}
    `;
  messages.appendChild(li);
};

const handleSendMsg = (event) => {
  event.preventDefault();
  const input = sendMsg.querySelector("input");
  const { value } = input;
  getSocket().emit(window.events.sendMsg, { message: value });
  input.value = "";
  appendMsg(value);
};

const updateTime = (time) => {
  if (time > 0) {
    timer.innerText = time;
  } else {
    timer.innerText = time;
    clearInterval(clearTimeId);
  }
};

export const startTime = (time) => {
  currentTime = time;
  timer.innerText = currentTime;
  clearTimeId = setInterval(() => updateTime(--currentTime), 1000);
};

export const endTime = () => {
  clearInterval(clearTimeId);
};

export const handleNewMessage = ({ message, nickname }) =>
  appendMsg(message, nickname);

if (sendMsg) {
  sendMsg.addEventListener("submit", handleSendMsg);
}

export const disableChat = () => (sendMsg.style.display = "none");
export const enableChat = () => (sendMsg.style.display = "flex");
